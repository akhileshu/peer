import { cn } from "@/lib/utils";
import React, { useState } from "react";

type Props = {
  node: node;
  trace: node[];
  onTraceChange: (trace: node[], isOpen: boolean) => void;
};

export function Dropdown({ node, trace, onTraceChange }: Props) {
  const currentTrace = [...trace, node];

  const toggle = () => {
    onTraceChange(currentTrace, !(node.isOpen ?? false));
  };

  return (
    <div className="flex flex-col gap-1">
      <div
        onClick={toggle}
        className={cn(
          "cursor-pointer px-3 py-1 rounded-md text-sm font-medium transition-colors",
          "hover:bg-blue-100",
          node.isOpen ? "bg-blue-500 text-white" : "text-gray-800"
        )}
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

export default Dropdown;

export type node = {
  name: string;
  multi?: boolean;
  children?: node[];
};

export function useTraceTree(initialTree: node[]) {
  const [tree, setTree] = useState<node[]>(initialTree);

  const updateTree = (trace: node[], isOpen: boolean) => {
    // recursively update tree structure based on the trace and isOpen
    const updatedTree = updateNodeTree(tree, trace, isOpen);
    console.log({ updatedTree });
    setTree(updatedTree);
  };

  return { tree, updateTree };
}

function updateNodeTree(
  nodes: node[],
  trace: node[],
  isOpen: boolean,
  level = 0
): node[] {
  return nodes.map((n) => {
    if (n.name !== trace[level]?.name) {
      // ❌ If multi is false, close other siblings at this level
      const parent = trace[level - 1];
      const isParentSingle = parent?.multi === false;

      if (isParentSingle && level === trace.length - 1) {
        return { ...n, isOpen: false };
      }

      return n;
    }

    const isLast = level === trace.length - 1;

    const updatedNode: node = {
      ...n,
      isOpen: isLast ? isOpen : n.isOpen,
      children: n.children
        ? updateNodeTree(n.children, trace, isOpen, level + 1)
        : undefined,
    };

    return updatedNode;
  });
}


export function getSelectedTree(tree: node[]): node[] {
  return tree
    .filter((n) => n.isOpen)
    .map((n) => ({
      ...n,
      children: n.children ? getSelectedTree(n.children) : undefined,
    }))
    .filter((n) => n.isOpen || (n.children && n.children.length > 0));
}
