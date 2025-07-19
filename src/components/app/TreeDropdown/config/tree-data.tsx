import { findNodeInTree } from "@/components/app/TreeDropdown/__internal__/utils";
import { Node } from "@/components/app/TreeDropdown/types";

export const treeDataInitialConfig: Node[] = [
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

/**
 * - fetch simulator
 */
export function TreeDataFetcher(node: Node): Promise<Node[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // node will have id , with that will be able to get children from DB
      //  resolve([{ name: "express" }, { name: "nestjs" }]);
      const match = findNodeInTree(treeDataInitialConfig, node.name);
      resolve(match?.children ?? []);
    }, 500); // delay to simulate API
  });
}
