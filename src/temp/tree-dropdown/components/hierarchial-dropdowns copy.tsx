import { cn } from "@/lib/utils";
import { TiDelete } from "react-icons/ti";

import { useEffect, useId, useState } from "react";

import { lib } from "@/lib";
import { useDropdownContext } from "@/services/profile/components/dropdowns-context";
import { createHierarchicalFetcher } from "@/services/profile/components/fetchOptionsForLevel";
import {
    ACTION_TYPE,
    ActionType,
    HierarchyConfigItem,
    Option,
    SELECT_TYPE,
    SelectType
} from "./types";

export const HierarchialDropdowns = ({
  fetchOptionsForLevelConfig,
  searchInputPlaceholder = "Search...",
  className,
}: {
  fetchOptionsForLevelConfig: HierarchyConfigItem[];
  searchInputPlaceholder?: string;
  className?: string;
}) => {
  const [levels, setLevels] = useState<
    {
      label: string;
      options: Option[];
      selectType: SelectType;
    }[]
  >([]);

  const { selectedOptions, setSelectedOptions } = useDropdownContext();

  const fetchNextOrUpdateLevels = async () => {
    const levelIndex = selectedOptions.length;
    const dependentOptions =
      levelIndex > 0 ? selectedOptions[levelIndex - 1] : [];
    //todo : simplify logic
    const isRequiredDependencySelectedOptionsNotAvailable =
      levelIndex !== 0 && dependentOptions.length === 0;
    if (isRequiredDependencySelectedOptionsNotAvailable) {
      clearFurtherLevels(levelIndex);
      return;
    }
    try {
      const nextLevel = await createHierarchicalFetcher(
        fetchOptionsForLevelConfig
      )(levelIndex, selectedOptions);
      if (nextLevel)
        setLevels((prev) => [...prev.slice(0, levelIndex), nextLevel]);
    } catch (error) {
      console.log(lib.utils.getErrorMessage(error));
      if (levels.length > levelIndex) clearFurtherLevels(levelIndex);
    }
  };

  const clearFurtherLevels = (levelIndex: number) => {
    setLevels((prev) => prev.slice(0, levelIndex));
  };

  //   const handleSelectionChange = (
  //     levelIndex: number,
  //     id: string,
  //     action: ActionType
  //   ) => {
  //     setSelectedOptions((prev) => {
  //       const currentLevel = prev[levelIndex] || [];
  //       const updatedLevel =
  //         action === ACTION_TYPE.add
  //           ? [...currentLevel, { id, title: getTitle(levelIndex, id) }]
  //           : action === ACTION_TYPE.remove
  //           ? currentLevel.filter((item) => item.id !== id)
  //           : [{ id, title: getTitle(levelIndex, id) }];
  //       const newSelection = [...prev.slice(0, levelIndex), updatedLevel];
  //       return newSelection;
  //     });
  //   };

    const handleSelectionChange = (
      levelIndex: number,
      id: string,
      action: ActionType
    ) => {
      setSelectedOptions((prev) => {
        const currentLevel = prev[levelIndex] || [];
        const updatedLevel =
          action === ACTION_TYPE.add
            ? [...currentLevel, { id, title: getTitle(levelIndex, id) }]
            : action === ACTION_TYPE.remove
            ? currentLevel.filter((item) => item.id !== id)
            : [{ id, title: getTitle(levelIndex, id) }];
        const newSelection = [...prev.slice(0, levelIndex), updatedLevel];
        return newSelection;
      });
    };

  const getTitle = (levelIndex: number, id: string) => {
    return (
      levels[levelIndex].options.find((option) => option.id === id)?.title || ""
    );
  };

  useEffect(() => {
    fetchNextOrUpdateLevels();
  }, [selectedOptions]);

  return (
    <div className={cn("p-2 border rounded-sm m-2 space-y-2 ", className)}>
      <p className="font-bold text-base">Filter Topics</p>
      {levels.map((level, index) => (
        <CollapsibleDropdown
          key={index}
          label={level.label}
          selectType={level.selectType}
          optionList={level.options}
          selectedOptionList={selectedOptions[index] || []}
          setSelectedOptionList={(id, action) =>
            handleSelectionChange(index, id, action)
          }
          searchInputPlaceholder={searchInputPlaceholder}
        />
      ))}
    </div>
  );
};

const CollapsibleDropdown = ({
  className,
  label,
  selectType,
  optionList,
  setSelectedOptionList,
  selectedOptionList,
  searchInputPlaceholder,
}: {
  className?: string;
  label: string;
  selectType: SelectType;
  optionList: Option[];
  setSelectedOptionList: (id: string, action: ActionType) => void;
  selectedOptionList: Option[];
  searchInputPlaceholder: string;
}) => {
  const [query, setQuery] = useState("");

  const filteredOptions = optionList.filter(
    (option) =>
      option.title.toLowerCase().includes(query.toLowerCase()) &&
      selectedOptionList.every((selected) => selected.id !== option.id)
  );

  const handleDelete = (id: string) => {
    setSelectedOptionList(id, ACTION_TYPE.remove);
  };

  const handleAdd = (id: string) => {
    if (selectType === SELECT_TYPE.single) {
      setSelectedOptionList(id, ACTION_TYPE.set);
    } else {
      setSelectedOptionList(id, ACTION_TYPE.add);
    }
  };
  const id = useId();
  return (
    <div className="flex items-center gap-2 max-w-lg text-sm">
      <label htmlFor={`${id}-${label}-dropdown-input`} className="flex-[2]">
        {label}
      </label>
      <div className={cn("relative group/dropdown flex-[8]", className)}>
        <div className="flex items-center border p-1 rounded-sm gap-2 flex-wrap">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            id={`${id}-${label}-dropdown-input`}
            className="outline-none"
            placeholder={searchInputPlaceholder}
          />
          {selectedOptionList.map((item) => (
            <div
              key={item.id}
              className="border p-1 rounded-sm flex items-center gap-1 bg-gray-100"
            >
              {item.title}
              <TiDelete
                className="cursor-pointer"
                onClick={() => handleDelete(item.id)}
              />
            </div>
          ))}
        </div>
        <div
          className="z-10 absolute border min-w-60 overflow-y-auto bg-white shadow-md invisible opacity-0 group-focus-within/dropdown:visible group-focus-within/dropdown:opacity-100 transition-opacity"
          tabIndex={-1}
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.map((item) => (
              <p
                key={item.id}
                className="p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleAdd(item.id)}
              >
                {item.title}
              </p>
            ))
          ) : (
            <p className="p-2 text-gray-500">No results</p>
          )}
        </div>
      </div>
    </div>
  );
};
