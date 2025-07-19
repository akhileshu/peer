"use client";
import React, { useEffect, useState } from "react";

// --------------------- Types ---------------------
export type node = {
  name: string;
  multi?: boolean;
  isOpen?: boolean;
  children?: node[];
};

// --------------------- Dropdown ---------------------
type DropdownProps = {
  node: node;
  trace: node[];
  onTraceChange: (trace: node[], isOpen: boolean) => void;
};

function Dropdown({ node, trace, onTraceChange }: DropdownProps) {
  const currentTrace = [...trace, node];

  const toggle = () => {
    onTraceChange(currentTrace, !(node.isOpen ?? false));
  };

  return (
    <div className="flex flex-col gap-1">
      <div
        onClick={toggle}
        className={`cursor-pointer px-3 py-1 rounded-md text-sm font-medium transition-colors ${
          node.isOpen
            ? "bg-blue-500 text-white"
            : "text-gray-800 hover:bg-blue-100"
        }`}
      >
        {node.name}
      </div>

      {node.isOpen && node.children && (
        <div className="ml-4 border-l-2 border-blue-200 pl-2 space-y-1">
          {node.children.map((child) => (
            <Dropdown
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
function updateNodeTree(
  nodes: node[],
  trace: node[],
  isOpen: boolean,
  level = 0
): node[] {
  return nodes.map((n) => {
    if (n.name !== trace[level]?.name) {
      const parent = trace[level - 1];
      const isParentSingle = parent?.multi === false;
      if (isParentSingle && level === trace.length - 1) {
        return { ...n, isOpen: false };
      }
      return n;
    }

    const isLast = level === trace.length - 1;

    return {
      ...n,
      isOpen: isLast ? isOpen : n.isOpen,
      children: n.children
        ? updateNodeTree(n.children, trace, isOpen, level + 1)
        : undefined,
    };
  });
}

function insertChildren(
  nodes: node[],
  trace: node[],
  children: node[],
  level = 0
): node[] {
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

function getSelectedTree(tree: node[]): node[] {
  return tree
    .filter((n) => n.isOpen)
    .map((n) => ({
      ...n,
      children: n.children ? getSelectedTree(n.children) : undefined,
    }))
    .filter((n) => n.isOpen || (n.children && n.children.length > 0));
}

function logTree(label: string, tree: node[]) {
  console.group(label);
  console.dir(tree, { depth: null });
  console.log("JSON:", JSON.stringify(tree, null, 2));
  console.groupEnd();
}

// --------------------- useTraceTree Hook ---------------------
function useTraceTree(
  initialTree: node[],
  fetchChildren?: (node: node) => Promise<node[]>
) {
  const [tree, setTree] = useState<node[]>(initialTree);

  const updateTree = async (trace: node[], isOpen: boolean) => {
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

// --------------------- Simulated API ---------------------
function simulateFetch(node: node): Promise<node[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { name: `${node.name}-child-1` },
        { name: `${node.name}-child-2` },
      ]);
    }, 500);
  });
}

// --------------------- Config ---------------------
const config: node[] = [
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

// --------------------- App ---------------------
export default function App() {
  const { tree, updateTree } = useTraceTree(config, simulateFetch);

  useEffect(() => {
    const selected = getSelectedTree(tree);
    logTree("Selected Tree", selected);
  }, [tree]);

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Progressive Tree</h2>
      {tree.map((node) => (
        <Dropdown
          key={node.name}
          node={node}
          trace={[]}
          onTraceChange={updateTree}
        />
      ))}
    </div>
  );
}
