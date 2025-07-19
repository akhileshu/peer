"use client";
import { TreeDropdownNode } from "@/components/app/TreeDropdown/__internal__/TreeDropdownNode";
import { useTraceTree } from "@/components/app/TreeDropdown/__internal__/useTraceTree";
import { TreeDataFetcher } from "@/components/app/TreeDropdown/config/tree-data";
import { Node } from "@/components/app/TreeDropdown/types";
import { lib } from "@/lib";
import { cn } from "@/lib/utils";

/**
 * @usage  <Components.userInput.TreeDropdownRoot treeDataInitialConfig={lib.ui.treeDropdownConfig.treeDataInitialConfig}/>
 */
export default function TreeDropdownRoot({
  treeDataInitialConfig,
  className,
}: {
  treeDataInitialConfig: Node[];
  className?: string;
}) {
  const { tree, updateTree, selectedTree } = useTraceTree(
    treeDataInitialConfig,
    TreeDataFetcher
  );

  lib.utils.logTree("Selected Tree", selectedTree);

  return (
    <div className={cn("p-4", className)}>
      <h2 className="text-lg font-semibold mb-4">Progressive Tree</h2>
      {tree.map((node) => (
        <TreeDropdownNode
          key={node.name}
          node={node}
          trace={[]}
          onTraceChange={updateTree}
        />
      ))}
    </div>
  );
}
