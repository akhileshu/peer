import { Node } from "@/components/app/TreeDropdown/types";
import { updateNodeTree } from "@/components/app/TreeDropdown/__internal__/updateNodeTree";
import { useState } from "react";

export function useTraceTree(
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

  return { tree, updateTree, selectedTree: getSelectedTree(tree) };
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
