import { JSX, useEffect, useState } from "react";

// types.ts
export type Option = {
  id: string;
  title: string;
};

export type SelectType = "single" | "multiple";

export type HierarchyConfigItem = {
  label: string;
  selectType: SelectType;
  getOptions: (context: {
    selectedOptions: Record<string, Option[]>;
    parentIdPath: string[];
  }) => Promise<Option[]>;
  children?: HierarchyConfigItem[];
};

const filterOptions = (options: Option[], query: string): Option[] => {
  return options.filter((opt) =>
    opt.title.toLowerCase().includes(query.toLowerCase())
  );
};

// fetcher.ts
export const createTreeFetcher = (config: HierarchyConfigItem[]) => {
  return async function fetchTree(
    node: HierarchyConfigItem,
    selectedOptions: Record<string, Option[]>,
    parentIdPath: string[]
  ) {
    const options = await node.getOptions({ selectedOptions, parentIdPath });
    return { label: node.label, selectType: node.selectType, options };
  };
};

// export const DropdownTree = ({ config }: { config: HierarchyConfigItem[] }) => {
//   const [selectedOptions, setSelectedOptions] = useState<
//     Record<string, Option[]>
//   >({});
//   const [levels, setLevels] = useState<any[]>([]);
//   const [queries, setQueries] = useState<Record<string, string>>({});

//   const findAllChildLabels = (node: HierarchyConfigItem): string[] => {
//     const labels: string[] = [];
//     if (node.children) {
//       for (const child of node.children) {
//         labels.push(child.label);
//         labels.push(...findAllChildLabels(child));
//       }
//     }
//     return labels;
//   };

//   const findNodeByLabel = (
//     nodes: HierarchyConfigItem[],
//     label: string
//   ): HierarchyConfigItem | null => {
//     for (const node of nodes) {
//       if (node.label === label) return node;
//       if (node.children) {
//         const found = findNodeByLabel(node.children, label);
//         if (found) return found;
//       }
//     }
//     return null;
//   };

//   const buildLevels = async (
//     nodes: HierarchyConfigItem[],
//     path: string[] = []
//   ): Promise<any[]> => {
//     const result: any[] = [];
//     for (const node of nodes) {
//       const options = await node.getOptions({
//         selectedOptions,
//         parentIdPath: path,
//       });
//       result.push({ label: node.label, options, selectType: node.selectType });

//       const selected = selectedOptions[node.label];
//       if (selected?.length && node.children) {
//         for (const sel of selected) {
//           const childLevels = await buildLevels(node.children, [
//             ...path,
//             sel.id,
//           ]);
//           result.push(...childLevels);
//         }
//       }
//     }
//     return result;
//   };

//   useEffect(() => {
//     (async () => {
//       const lvls = await buildLevels(config);
//       setLevels(lvls);
//     })();
//   }, [selectedOptions]);

//   const handleSelect = (
//     label: string,
//     selectType: SelectType,
//     option: Option
//   ) => {
//     setSelectedOptions((prev) => {
//       const existing = prev[label] || [];
//       let updated: Option[];

//       if (selectType === "multiple") {
//         updated = existing.some((o) => o.id === option.id)
//           ? existing.filter((o) => o.id !== option.id)
//           : [...existing, option];
//       } else {
//         updated = [option];
//       }

//       const newSelection = { ...prev, [label]: updated };

//       const node = findNodeByLabel(config, label);
//       if (node) {
//         const childLabels = findAllChildLabels(node);
//         for (const childLabel of childLabels) {
//           delete newSelection[childLabel];
//         }
//       }

//       return newSelection;
//     });
//   };

//   const handleQueryChange = (label: string, value: string) => {
//     setQueries((prev) => ({ ...prev, [label]: value }));
//   };

//   return (
//     <div className="space-y-6">
//       {levels.map((level) => {
//         const query = queries[level.label] || "";
//         const filtered = filterOptions(level.options, query);

//         return (
//           <div key={level.label}>
//             <label className="block font-semibold mb-1">{level.label}</label>
//             <input
//               type="text"
//               placeholder={`Search ${level.label}`}
//               value={query}
//               onChange={(e) => handleQueryChange(level.label, e.target.value)}
//               className="border px-2 py-1 mb-2 w-full text-sm rounded"
//             />
//             <div className="flex flex-wrap gap-2">
//               {filtered.length > 0 ? (
//                 filtered.map((opt: Option) => {
//                   const isSelected = selectedOptions[level.label]?.some(
//                     (s) => s.id === opt.id
//                   );
//                   return (
//                     <button
//                       key={opt.id}
//                       onClick={() =>
//                         handleSelect(level.label, level.selectType, opt)
//                       }
//                       className={`border px-3 py-1 rounded ${
//                         isSelected
//                           ? "bg-blue-500 text-white"
//                           : "hover:bg-gray-100"
//                       }`}
//                     >
//                       {opt.title}
//                     </button>
//                   );
//                 })
//               ) : (
//                 <p className="text-gray-500">No results</p>
//               )}
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// recursive rendering with search
export const DropdownTree = ({ config }: { config: HierarchyConfigItem[] }) => {
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, Option[]>
  >({});
  const [queries, setQueries] = useState<Record<string, string>>({});

  const handleSelect = (
    label: string,
    selectType: SelectType,
    option: Option,
    childrenLabels: string[]
  ) => {
    setSelectedOptions((prev) => {
      const existing = prev[label] || [];
      let updated: Option[];

      if (selectType === "multiple") {
        updated = existing.some((o) => o.id === option.id)
          ? existing.filter((o) => o.id !== option.id)
          : [...existing, option];
      } else {
        updated = [option];
      }

      const newSelection = { ...prev, [label]: updated };
      for (const child of childrenLabels) {
        delete newSelection[child];
      }
      return newSelection;
    });
  };

  const renderNode = async (
    node: HierarchyConfigItem,
    parentIdPath: string[]
  ): Promise<JSX.Element> => {
    const options = await node.getOptions({
      selectedOptions,
      parentIdPath,
    });

    const query = queries[node.label] || "";
    const filtered = filterOptions(options, query);
    const selected = selectedOptions[node.label] || [];

    const childrenLabels = getAllChildrenLabels(node);

    return (
      <div key={node.label} className="ml-4 mb-6">
        <label className="block font-semibold mb-1">{node.label}</label>
        <input
          placeholder={`Search ${node.label}`}
          value={query}
          onChange={(e) =>
            setQueries((prev) => ({ ...prev, [node.label]: e.target.value }))
          }
          className="border px-2 py-1 mb-2 w-full text-sm rounded"
        />
        <div className="flex flex-wrap gap-2">
          {filtered.length > 0 ? (
            filtered.map((opt) => {
              const isSelected = selected.some((s) => s.id === opt.id);
              return (
                <button
                  key={opt.id}
                  onClick={() =>
                    handleSelect(
                      node.label,
                      node.selectType,
                      opt,
                      childrenLabels
                    )
                  }
                  className={`border px-3 py-1 rounded ${
                    isSelected ? "bg-blue-500 text-white" : "hover:bg-gray-100"
                  }`}
                >
                  {opt.title}
                </button>
              );
            })
          ) : (
            <p className="text-gray-500">No results</p>
          )}
        </div>

        {/* Render children recursively */}
        {node.children &&
          selected.map((sel) =>
            node.children!.map((child) => (
              <DropdownTreeNode
                key={`${node.label}-${sel.id}-${child.label}`}
                node={child}
                parentIdPath={[...parentIdPath, sel.id]}
                selectedOptions={selectedOptions}
                setSelectedOptions={setSelectedOptions}
                queries={queries}
                setQueries={setQueries}
              />
            ))
          )}
      </div>
    );
  };

  // Extracted recursive node for better separation
  const DropdownTreeNode = ({
    node,
    parentIdPath,
    selectedOptions,
    setSelectedOptions,
    queries,
    setQueries,
  }: {
    node: HierarchyConfigItem;
    parentIdPath: string[];
    selectedOptions: Record<string, Option[]>;
    setSelectedOptions: React.Dispatch<
      React.SetStateAction<Record<string, Option[]>>
    >;
    queries: Record<string, string>;
    setQueries: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  }) => {
    return <AsyncRender node={node} parentIdPath={parentIdPath} />;
  };

  // Utility to collect all children recursively
  const getAllChildrenLabels = (node: HierarchyConfigItem): string[] => {
    let labels: string[] = [];
    if (node.children) {
      for (const child of node.children) {
        labels.push(child.label);
        labels.push(...getAllChildrenLabels(child));
      }
    }
    return labels;
  };

  // Async wrapper
  const AsyncRender = ({
    node,
    parentIdPath,
  }: {
    node: HierarchyConfigItem;
    parentIdPath: string[];
  }) => {
    const [jsx, setJsx] = useState<JSX.Element | null>(null);

    useState(() => {
      (async () => {
        const el = await renderNode(node, parentIdPath);
        setJsx(el);
      })();
    });

    return jsx;
  };

  return (
    <div>
      {config.map((node) => (
        <AsyncRender key={node.label} node={node} parentIdPath={[]} />
      ))}
    </div>
  );
};
