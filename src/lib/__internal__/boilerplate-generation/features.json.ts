import { ComponentKind } from "./types/component-config";
import { FeatureConfig } from "./types/types";

export const featuresList: FeatureConfig[] = [
  {
    name: "template",
    components: [
      {
        name: "template",
        restResource: "templates",
        kind: ComponentKind.Page,
        pages: ["detail", "list"],
        forms: ["create", "edit", "delete"],
        // UIs: [
        //   {
        //     type: "modal",
        //     name: "confirmTemplateDeletion",
        //   },
        // ],
      },
      {
        name: "projectFromTemplate",
        kind: ComponentKind.ComponentForm,
        forms: ["create"],
      },
      {
        name: "sampleProject",
        kind: ComponentKind.ComponentRender,
        renderTypes: ["list"],
      },
    ],
    serverActions: {
      generateCRUD: true,
      custom: [
        { operation: "read", name: "TemplateSampleProjects" },
        { operation: "create", name: "ProjectFromTemplate" },
      ],
    },

    zodSchemas: [
      {
        resourceName: "template",
        type: ["create", "delete", "update"],
      },
      {
        resourceName: "ProjectFromTemplate",
        type: ["create"],
      },
    ],
    types: ["template", "projectFromTemplate"],
    constants: ["template", "projectFromTemplate"],
  },
  {
    name: "project",
    components: [
      {
        name: "project",
        restResource: "projects",
        kind: ComponentKind.Page,
        pages: ["detail", "list"],
        forms: ["create", "edit", "delete"],
        UIs: [{ type: "table", name: "ProjectTable" }],
      },
      {
        name: "projectTimeline",
        restResource: "projectTimelines",
        kind: ComponentKind.Page,
        pages: ["detail", "list"],
        forms: ["create", "edit", "delete"],
        UIs: [{ type: "table", name: "TimelineTable" }],
      },
      {
        name: "phase",
        restResource: "phases",
        kind: ComponentKind.Page,
        pages: ["detail", "list"],
        forms: ["create", "edit", "delete"],
        UIs: [{ type: "table", name: "PhaseTable" }],
      },
      {
        name: "feature",
        restResource: "features",
        kind: ComponentKind.Page,
        pages: ["list", "detail"],
        forms: ["create", "edit", "delete"],
        UIs: [{ type: "table", name: "FeatureTable" }],
      },
    ],
    serverActions: {
      generateCRUD: true,
      custom: [
        { operation: "read", name: "ProjectWithMVP" },
        { operation: "read", name: "TimelineWithPhases" },
        { operation: "read", name: "ProjectFeatures" },
      ],
    },
    zodSchemas: [
      {
        resourceName: "project",
        type: ["create", "update", "delete"],
      },
      {
        resourceName: "projectTimeline",
        type: ["create", "update"],
      },
      {
        resourceName: "phase",
        type: ["create", "update"],
      },
      {
        resourceName: "feature",
        type: ["create", "update"],
      },
    ],
    types: ["project", "projectTimeline", "phase", "feature"],
    constants: ["project", "projectTimeline", "phase", "feature"],
  },
];
