import { Node, onTraceChange } from "@/components/app/TreeDropdown/types";

type TreeNodeItemProps = {
  node: Node;
  currentTrace: Node[];
  isOpen: boolean;
  onTraceChange: onTraceChange;
};

function TreeNodeItem({
  node,
  currentTrace,
  isOpen,
  onTraceChange,
}: TreeNodeItemProps) {
  return (
    <div
      onClick={() => onTraceChange(currentTrace, isOpen)}
      className={`cursor-pointer px-3 py-1 rounded-md text-sm font-medium transition-colors ${
        node.isOpen
          ? "bg-blue-500 text-white"
          : "text-gray-800 hover:bg-blue-100"
      }`}
    >
      {node.name}
    </div>
  );
}
