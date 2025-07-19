import { createHierarchicalFetcher } from "@/services/profile/components/fetchOptionsForLevel";
import { areaOfFocusList } from "../../../../data/areaOfFocus";
import { FetchOptionsForLevel, HierarchyConfigItem, Option, SELECT_TYPE } from "./types";
import { DropdownProvider, useDropdownContext } from "@/services/profile/components/dropdowns-context";
import { HierarchialDropdowns } from "@/services/profile/components/hierarchial-dropdowns";

export default function AreaFocusSelector() {
  return (
    <DropdownProvider>
      <div className="p-4 space-y-4">
        <HierarchialDropdowns
          fetchOptionsForLevelConfig={config}
          searchInputPlaceholder="Search focus/skills/interests"
        />
        <SaveButton />
      </div>
    </DropdownProvider>
  );
}

// 3. Example Save Button (can be replaced with API call)
function SaveButton() {
  const { selectedOptions } = useDropdownContext();

  const handleSave = () => {
    const payload = {
      areaOfFocus: selectedOptions[0]?.map((o) => o.id) || [],
      skills: selectedOptions[1]?.map((o) => o.id) || [],
      interests: selectedOptions[2]?.map((o) => o.id) || [],
    };
    console.log("Submit payload:", payload);
    // TODO: Send to API
  };

  return (
    <button
      onClick={handleSave}
      className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
    >
      Save Preferences
    </button>
  );
}

const config: HierarchyConfigItem[] = [
  {
    label: "Area of Focus",
    selectType: "multiple",
    getOptions: async () => {
      return areaOfFocusList.map((f) => ({
        id: f.id,
        title: f.label,
      }));
    },
  },
  {
    label: "Skills",
    selectType: "multiple",
    dependsOnLevel: 0,
    getOptions: async ({ selectedDependencyIds }) => {
      const relatedSkills: Option[] = [];

      areaOfFocusList.forEach((focus) => {
        if (selectedDependencyIds?.includes(focus.id)) {
          focus.skills.forEach((s) =>
            relatedSkills.push({ id: s.id, title: s.label })
          );
        }
      });

      return Array.from(new Map(relatedSkills.map((s) => [s.id, s])).values());
    },
  },
  {
    label: "Interests",
    selectType: "multiple",
    dependsOnLevel: 0,
    getOptions: async ({ selectedDependencyIds }) => {
      const relatedInterests: Option[] = [];
      areaOfFocusList.forEach((focus) => {
        if (selectedDependencyIds?.includes(focus.id)) {
          focus.interests.forEach((i) =>
            relatedInterests.push({ id: i.id, title: i.label })
          );
        }
      });

      // Remove duplicates
      return Array.from(
        new Map(relatedInterests.map((i) => [i.id, i])).values()
      );
    },
  },
];
