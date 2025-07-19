"use client";
import { useEffect, useState } from "react";

type Node = {
  name: string;
  multi?: boolean;
  isOpen?: boolean;
  children?: Node[];
};


const utils = {};

type DropdownProps = {
  node: Node;
  trace: Node[];
  onTraceChange: onTraceChange;
};


function TreeDropdown({ node, trace, onTraceChange }: DropdownProps) {
  const currentTrace = [...trace, node];
  const isOpen = !(node.isOpen ?? false);
  return (
    <div className="flex flex-col gap-1">
      <TreeNodeItem
        node={node}
        currentTrace={currentTrace}
        isOpen={isOpen}
        onTraceChange={onTraceChange}
      />

      {isOpen && node.children && (
        <div className="ml-4 border-l-2 border-blue-200 pl-2 space-y-1">
          {node.children.map((child) => (
            <TreeDropdown
              key={child.name}
              node={child}
              trace={currentTrace}
              onTraceChange={onTraceChange}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// --------------------- Tree Logic ---------------------
function getClosedNode(node: Node): Node {
  return { ...node, isOpen: false };
}

/**
 * 
   - Node is in the trace path → toggle its open state, update children
   - if clicking an Opened node, close it
   - switch sibbling , if only single select enabled on parent , open current , close others
 */
function getToggledNodeWithChildren(
  node: Node,
  trace: Node[],
  isOpen: boolean,
  level: number,
  isLastInTrace: boolean
): Node {
  return {
    ...node,
    isOpen: isLastInTrace ? isOpen : node.isOpen,
    children: node.children
      ? updateNodeTree(node.children, trace, isOpen, level + 1)
      : undefined,
  };
}
function updateNodeTree(
  nodes: Node[],
  trace: Node[],
  isOpen: boolean,
  level = 0
): Node[] {
  return nodes.map((node) => {
    const currentTraceNode = trace[level];
    const isCurrentMatch = node.name === currentTraceNode?.name;
    const isLastInTrace = level === trace.length - 1;
    const parent = trace[level - 1];
    const isParentSingle = parent?.multi === false;

    if (!isCurrentMatch) {
      if (isParentSingle && isLastInTrace) return getClosedNode(node);
      return node; // ignore this node as nothing has changed about this
    }

    return getToggledNodeWithChildren(
      node,
      trace,
      isOpen,
      level,
      isLastInTrace
    );
  });
}

function insertChildren(
  nodes: Node[],
  trace: Node[],
  children: Node[],
  level = 0
): Node[] {
  return nodes.map((n) => {
    if (n.name !== trace[level]?.name) return n;

    const isTarget = level === trace.length - 1;

    return {
      ...n,
      children: isTarget
        ? children
        : insertChildren(n.children || [], trace, children, level + 1),
    };
  });
}

function getSelectedTree(tree: Node[]): Node[] {
  return tree
    .filter((n) => n.isOpen)
    .map((n) => ({
      ...n,
      children: n.children ? getSelectedTree(n.children) : undefined,
    }))
    .filter((n) => n.isOpen || (n.children && n.children.length > 0));
}

function logTree(label: string, tree: Node[]) {
  console.group(label);
  console.dir(tree, { depth: null });
  console.log("JSON:", JSON.stringify(tree, null, 2));
  console.groupEnd();
}

// --------------------- useTraceTree ---------------------
function useTraceTree(
  initialTree: Node[],
  fetchChildren?: (node: Node) => Promise<Node[]>
) {
  const [tree, setTree] = useState<Node[]>(initialTree);

  const updateTree = async (trace: Node[], isOpen: boolean) => {
    let newTree = updateNodeTree(tree, trace, isOpen);

    if (isOpen) {
      const target = trace[trace.length - 1];
      const alreadyHasChildren = target.children?.length;

      if (!alreadyHasChildren && fetchChildren) {
        const children = await fetchChildren(target);
        newTree = insertChildren(newTree, trace, children);
      }
    }

    setTree(newTree);
  };

  return { tree, updateTree };
}

// --------------------- Ideal Config (Simulated DB/API) ---------------------
const fullConfig: Node[] = [
  {
    name: "frontend",
    multi: false,
    children: [
      {
        name: "react",
        multi: false,
        children: [{ name: "useState" }, { name: "useEffect" }],
      },
      { name: "nextjs" },
    ],
  },
  {
    name: "backend",
    multi: true,
    children: [{ name: "express" }, { name: "nestjs" }],
  },
];

// --------------------- Simulated Fetch ---------------------
function simulateFetch(node: Node): Promise<Node[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // node will have id , with that will be able to get children from DB
      //  resolve([{ name: "express" }, { name: "nestjs" }]);
      const match = findNodeInTree(fullConfig, node.name);
      resolve(match?.children ?? []);
    }, 500); // delay to simulate API
  });
}

function findNodeInTree(nodes: Node[], name: string): Node | undefined {
  for (const n of nodes) {
    if (n.name === name) return n;
    if (n.children) {
      const child = findNodeInTree(n.children, name);
      if (child) return child;
    }
  }
  return undefined;
}

// --------------------- Initial State (Only top level known) ---------------------
const initialTree: Node[] = fullConfig.map(({ name, multi }) => ({
  name,
  multi,
}));

// --------------------- App ---------------------
export default function TreeDropDownComponent() {
  const { tree, updateTree } = useTraceTree(initialTree, simulateFetch);

  useEffect(() => {
    const selected = getSelectedTree(tree);
    logTree("Selected Tree", selected);
  }, [tree]);

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Progressive Tree</h2>
      {tree.map((node) => (
        <TreeDropdown
          key={node.name}
          node={node}
          trace={[]}
          onTraceChange={updateTree}
        />
      ))}
    </div>
  );
}
