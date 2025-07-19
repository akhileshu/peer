import { Node } from "@/components/app/TreeDropdown/types";

/**
 * 
   - Node is in the trace path → toggle its open state, update children
   - if clicking an Opened node, close it
   - if only single select enabled on parent , open current , close others
 */
function getToggledNodeWithChildren(
  node: Node,
  trace: Node[],
  isOpen: boolean,
  level: number,
  isLastInTrace: boolean
): Node {
  const isOpenUpdated = isLastInTrace ? isOpen : node.isOpen;
  const childrenUpdated =
    isOpenUpdated && node.children
      ? updateNodeTree(node.children, trace, isOpen, level + 1)
      : undefined;
  return {
    ...node,
    isOpen: isOpenUpdated,
    children: childrenUpdated,
  };
}
function getFullyClosedNode(node: Node): Node {
  return {
    ...node,
    isOpen: false,
    children: node.children ? node.children.map(getFullyClosedNode) : undefined,
  };
}

// a bit difficult to understand algorithm , better placing breakpoints in ui
export function updateNodeTree(
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
    const isParentAllowsSingleSelect = parent?.multi === false;

    console.log({isCurrentMatch,isClickedNode: isLastInTrace,isParentAllowsSingleSelect , name:node.name})

    if (!isCurrentMatch) {
      // if only single select enabled on parent , open current , close others
      if (isParentAllowsSingleSelect && isLastInTrace) return getFullyClosedNode(node);
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