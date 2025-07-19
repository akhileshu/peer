import { HierarchyConfigItem } from "@/services/profile/components/FocusSelector";

export const areaOfFocusConfig: HierarchyConfigItem[] = [
  {
    label: "Area of Focus",
    selectType: "single",
    getOptions: async () =>
      areaOfFocusList.map((f) => ({ id: f.id, title: f.label })),
    children: [
      {
        label: "Skills",
        selectType: "multiple",
        getOptions: async ({ parentIdPath }) => {
          const focusId = parentIdPath[0];
          const found = areaOfFocusList.find((f) => f.id === focusId);
          return found?.skills.map((s) => ({ id: s.id, title: s.label })) || [];
        },
      },
      {
        label: "Interests",
        selectType: "multiple",
        getOptions: async ({ parentIdPath }) => {
          const focusId = parentIdPath[0];
          const found = areaOfFocusList.find((f) => f.id === focusId);
          return (
            found?.interests.map((i) => ({ id: i.id, title: i.label })) || []
          );
        },
      },
    ],
  },
];

// mockData.ts (example structure)
export const areaOfFocusList = [
  {
    id: "frontend",
    label: "Frontend",
    skills: [
      { id: "react", label: "React" },
      { id: "vue", label: "Vue" },
    ],
    interests: [
      { id: "ux", label: "UX Design" },
      { id: "animation", label: "Web Animation" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    skills: [
      { id: "node", label: "Node.js" },
      { id: "django", label: "Django" },
    ],
    interests: [
      { id: "api", label: "APIs" },
      { id: "security", label: "Security" },
    ],
  },
];
