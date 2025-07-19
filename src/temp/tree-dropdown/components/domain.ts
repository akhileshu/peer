import { HierarchyConfigItem } from "@/services/profile/components/FocusSelector";

export const domainConfig: HierarchyConfigItem[] = [
  {
    label: "Domain",
    selectType: "single",
    getOptions: async () =>
      domainList.map((d) => ({ id: d.id, title: d.label })),
    children: [
      {
        label: "Subdomain",
        selectType: "single",
        getOptions: async ({ parentIdPath }) => {
          const domainId = parentIdPath[0];
          const domain = domainList.find((d) => d.id === domainId);
          return (
            domain?.subdomains.map((sd) => ({ id: sd.id, title: sd.label })) ||
            []
          );
        },
        children: [
          {
            label: "Topics",
            selectType: "multiple",
            getOptions: async ({ parentIdPath }) => {
              const [domainId, subdomainId] = parentIdPath;
              const domain = domainList.find((d) => d.id === domainId);
              const subdomain = domain?.subdomains.find(
                (s) => s.id === subdomainId
              );
              return (
                subdomain?.topics.map((t) => ({ id: t.id, title: t.label })) ||
                []
              );
            },
          },
        ],
      },
    ],
  },
];

export const domainList = [
  {
    id: "tech",
    label: "Technology",
    subdomains: [
      {
        id: "web",
        label: "Web Development",
        topics: [
          { id: "react", label: "React" },
          { id: "nextjs", label: "Next.js" },
        ],
      },
      {
        id: "ml",
        label: "Machine Learning",
        topics: [
          { id: "pytorch", label: "PyTorch" },
          { id: "tensorflow", label: "TensorFlow" },
        ],
      },
    ],
  },
  {
    id: "design",
    label: "Design",
    subdomains: [
      {
        id: "ui",
        label: "UI Design",
        topics: [
          { id: "figma", label: "Figma" },
          { id: "sketch", label: "Sketch" },
        ],
      },
    ],
  },
];
