import { TreeNodeItem } from "@/components/app/TreeDropdown/config/TreeNodeItem";
import { DropdownProps } from "@/components/app/TreeDropdown/types";

export function TreeDropdownNode({ node, trace, onTraceChange }: DropdownProps) {
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

      {node.isOpen && node.children && (
        <div className="ml-4 border-l-2 border-blue-200 pl-2 space-y-1">
          {node.children.map((child) => (
            <TreeDropdownNode
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

