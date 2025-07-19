import { cn } from "@/lib/utils";
import React, { useState } from "react";

type Props = {
  node: node;
  trace: node[];
  onTraceChange: (trace: node[], isOpen: boolean) => void;
  traceList: node[][];
};

export function Dropdown({ node, trace, traceList, onTraceChange }: Props) {
  const currentTrace = [...trace, node];
  // const [isOpen, setIsOpen] = useState(false);

  const isOpen = traceList.some(
    (t) =>
      t.length >= currentTrace.length &&
      currentTrace.every((n, i) => t[i].name === n.name)
  );

  const toggle = () => {
    const newOpen = !isOpen;
    // setIsOpen(newOpen);
    onTraceChange(currentTrace, newOpen);
  };

  return (
    <div className="flex flex-col gap-1">
      <div
        onClick={toggle}
        className={cn(
          "cursor-pointer px-3 py-1 rounded-md text-sm font-medium transition-colors",
          "hover:bg-blue-100",
          isOpen ? "bg-blue-500 text-white" : "text-gray-800"
        )}
      >
        {node.name}
      </div>

      {isOpen && node.children && (
        <div className="ml-4 border-l-2 border-blue-200 pl-2 space-y-1">
          {node.children.map((child) => (
            <Dropdown
              key={child.name}
              node={child}
              trace={currentTrace}
              traceList={traceList}
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

function buildTree(traces: string[][]): node[] {
  const root: node[] = [];

  for (const path of traces) {
    let currentLevel = root;

    for (const name of path) {
      let existing = currentLevel.find((n) => n.name === name);

      if (!existing) {
        existing = { name };
        currentLevel.push(existing);
      }

      if (!existing.children) {
        existing.children = [];
      }

      currentLevel = existing.children;
    }
  }

  return root;
}
// export function useTraceTree() {
//   const [traceList, setTraceList] = useState<string[][]>([]);

//   const updateTrace = (trace: string[], isOpen: boolean, index: number) => {
//     // todo: if allowing single selection insted of multi select
//     // setTraceList((prev) => {
//     //   const updated = [...prev];
//     //   updated[index] = trace;
//     //   return updated;
//     // });
//     setTraceList((prev) => {
//       let result: string[][];
//       if (isOpen) {
//         const exists = prev.some((t) => t.join() === trace.join());
//         result = exists ? prev : [...prev, trace];
//       } else {
//         result = prev.filter(
//           (t) => !t.slice(0, trace.length).every((val, i) => val === trace[i])
//         );
//       }
//       return result;
//     });
//   };

//   const tree = buildTree(traceList);

//   return { traceList, tree, updateTrace };
// }

export function useTraceTree() {
  const [traceList, setTraceList] = useState<node[][]>([]);

  const updateTrace = (trace: node[], isOpen: boolean) => {
    setTraceList((prev) => {
      if (!isOpen) {
        return prev.filter(
          (t) =>
            !t.slice(0, trace.length).every((n, i) => n.name === trace[i].name)
        );
      }

      const parent = trace.at(-2); // parent node of the current
      const multi = parent?.multi ?? true;

      if (multi) {
        const exists = prev.some(
          (t) =>
            t.length === trace.length &&
            t.every((n, i) => n.name === trace[i].name)
        );
        return exists ? prev : [...prev, trace];
      } else {
        const parentPath = trace.slice(0, -1);
        const filtered = prev.filter(
          (t) =>
            !t
              .slice(0, parentPath.length)
              .every((n, i) => n.name === parentPath[i].name)
        );
        return [...filtered, trace];
      }
    });
  };

  const stringTraceList = traceList.map((trace) => trace.map((n) => n.name));
  const tree = buildTree(stringTraceList);

  return { traceList, tree, updateTrace };
}
