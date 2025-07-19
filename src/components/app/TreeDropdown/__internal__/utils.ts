import { Node } from "@/components/app/TreeDropdown/types";

/**
 * dummy helper for featch simulator ,you will require your own custom fetch logic as per business logic
 */
export function findNodeInTree(nodes: Node[], name: string): Node | undefined {
  for (const n of nodes) {
    if (n.name === name) return n;
    if (n.children) {
      const child = findNodeInTree(n.children, name);
      if (child) return child;
    }
  }
  return undefined;
}

