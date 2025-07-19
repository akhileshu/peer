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
    selectedOptions: SelectedOptionsTree;
    parentIdPath: string[];
  }) => Promise<Option[]>;
  children?: HierarchyConfigItem[];
};

// New type for tree-structured selected options
export type SelectedOptionsTree = {
  [label: string]: {
    selected: Option[];
    children: {
      [parentId: string]: SelectedOptionsTree;
    };
  };
};

const filterOptions = (options: Option[], query: string): Option[] => {
  return options.filter((opt) =>
    opt.title.toLowerCase().includes(query.toLowerCase())
  );
};

export const DropdownTree = ({ config }: { config: HierarchyConfigItem[] }) => {
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptionsTree>(
    {}
  );
  const [queries, setQueries] = useState<Record<string, string>>({});

  const handleSelect = (
    node: HierarchyConfigItem,
    option: Option,
    parentIdPath: string[]
  ) => {
    setSelectedOptions((prev) => {
      const newTree = { ...prev };
      let currentLevel = newTree;

      // Navigate to the correct level in the tree using parentIdPath
      for (const parentId of parentIdPath) {
        const parentLabel = Object.keys(currentLevel)[0]; // Assuming one parent at each level
        if (parentLabel && currentLevel[parentLabel]) {
          const selectedParent = currentLevel[parentLabel].selected.find(
            (opt) => opt.id === parentId
          );
          if (selectedParent) {
            const parentIdStr = selectedParent.id;
            if (!currentLevel[parentLabel].children[parentIdStr]) {
              currentLevel[parentLabel].children[parentIdStr] = {};
            }
            currentLevel = currentLevel[parentLabel].children[parentIdStr];
          }
        }
      }

      // Update the current node's selection
      if (!currentLevel[node.label]) {
        currentLevel[node.label] = {
          selected: [],
          children: {},
        };
      }

      const currentSelections = currentLevel[node.label].selected;
      let newSelections: Option[];

      if (node.selectType === "multiple") {
        newSelections = currentSelections.some((o) => o.id === option.id)
          ? currentSelections.filter((o) => o.id !== option.id)
          : [...currentSelections, option];
      } else {
        newSelections = [option];
      }

      currentLevel[node.label] = {
        selected: newSelections,
        children: currentLevel[node.label].children,
      };

      return newTree;
    });
  };

  const getSelectedOptionsForNode = (
    node: HierarchyConfigItem,
    parentIdPath: string[]
  ): Option[] => {
    let currentLevel = selectedOptions;

    for (const parentId of parentIdPath) {
      const parentLabel = Object.keys(currentLevel)[0];
      if (parentLabel && currentLevel[parentLabel]) {
        const parentIdStr = parentId;
        if (currentLevel[parentLabel].children[parentIdStr]) {
          currentLevel = currentLevel[parentLabel].children[parentIdStr];
        } else {
          return [];
        }
      }
    }

    return currentLevel[node.label]?.selected || [];
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
    const selected = getSelectedOptionsForNode(node, parentIdPath);

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
                  onClick={() => handleSelect(node, opt, parentIdPath)}
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
                queries={queries}
                setQueries={setQueries}
              />
            ))
          )}
      </div>
    );
  };

  const DropdownTreeNode = ({
    node,
    parentIdPath,
    selectedOptions,
    queries,
    setQueries,
  }: {
    node: HierarchyConfigItem;
    parentIdPath: string[];
    selectedOptions: SelectedOptionsTree;
    queries: Record<string, string>;
    setQueries: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  }) => {
    const [jsx, setJsx] = useState<JSX.Element | null>(null);

    useEffect(() => {
      (async () => {
        const el = await renderNode(node, parentIdPath);
        setJsx(el);
      })();
    }, [node, parentIdPath, selectedOptions, queries]);

    return jsx;
  };

  return (
    <div>
      {config.map((node) => (
        <DropdownTreeNode
          key={node.label}
          node={node}
          parentIdPath={[]}
          selectedOptions={selectedOptions}
          queries={queries}
          setQueries={setQueries}
        />
      ))}
    </div>
  );
};
