import { Answers } from "inquirer";
import { ComponentConfig } from "./component-config";

export type zodSchemaType = "create" | "update" | "delete";
export type CRUDOperation = "create" | "read" | "update" | "delete";

export interface FeatureConfig {
  name: string;
  components?: ComponentConfig[];

  serverActions?: {
    generateCRUD?: boolean;
    custom: {
      operation: CRUDOperation;
      name: string;
    }[];
  };
  zodSchemas?: {
    resourceName: string;
    type: zodSchemaType[];
  }[];
  prismaModels?: string[];
  hooks?: string[];
  types?: string[];
  utils?: string[];
  constants?: string[];

  /*
  store?: string;
  messages?: string[];
  services?: string[];
  permissions?: string[];
  layouts?: string[];
  providers?: string[];
  tests?: {
    components?: string[];
    api?: string[];
    utils?: string[];
  };
  mockData?: string[];
  env?: string[];
  readme?: boolean;
  apiRoutes?: string[];
  */
}

export interface PlopData extends Answers {
  featureName: string;
  partsToGenerate?: string[];
}

/*
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
        UIs: [
          {
            type: "modal",
            name: "confirmTemplateDeletion",
          },
        ],
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
  }
];
*/

/*
export const featuresList: FeatureConfig[] = [
  {
    name: "template",
    components: {
      rendering: [
        {
          name: "sampleProject",
          isEditable: false,
          isPage: false,
          type: "list",
        },
        {
          name: "template",
          restResourceName: "templates",
          isEditable: false,
          isPage: true,
          type: "list",
        },
        {
          name: "template",
          restResourceName: "templates",
          isEditable: true,
          isPage: true,
          type: "detail",
        },
      ],
      forms: {
        create: [
          {
            name: "template",
          },
          {
            name: "projectFromTemplate",
          },
        ],
        edit: [
          {
            name: "template",
          },
        ],
        delete: [
          {
            name: "template",
          },
        ],
      },
    },
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
];
*/

/*
const exampleFeaturesList: FeatureConfig[] = [

  {
    name: "video",
    components: {
      rendering: [
        {
          name: "video",
          option: {
            generateTestFile: true,
            isEditableView: true,
            renderAsList: false,
          },
        },
        {
          name: "videoPlaylist",
          option: {
            isEditableView: true,
            generateTestFile: false,
            renderAsList: true,
          },
        },
      ],
      forms: {
        create: [
          {
            name: "video",
            option: {
              generateTestFile: true,
            },
          },
          {
            name: "videoPlaylist",
            option: {
              generateTestFile: false,
            },
          },
        ],
        edit: [
          {
            name: "video",
            option: {
              generateTestFile: true,
            },
          },
        ],
        delete: [
          {
            name: "videoPlaylist",
            option: {
              generateTestFile: false,
            },
          },
        ],
      },
      ui: {
        table: [
          {
            name: "videoTable",
            option: {
              generateTestFile: true,
            },
          },
        ],
        modal: [
          {
            name: "confirmDeleteVideo",
            option: {
              generateTestFile: false,
            },
          },
        ],
      },
    },
    serverActions: {
      generateCRUD: true,
      custom: [
        { operation: "read", name: "getTrendingPlaylists" },
        { operation: "create", name: "clonePlaylist" },
      ],
    },
    prismaSchemas: ["Video", "VideoPlaylist"],
    zodSchemas: ["video", "videoInput"],
    hooks: ["uploadVideo", "processStatus"],
    types: ["Video"],
    utils: ["formatDuration", "getThumbnail"],
    constants: ["videoStatus"],

    // below fields are still not generated and tested
    apiRoutes: ["upload", "process", "get", "delete"],
    store: "useVideoStore",
    messages: ["ADD_SUCCESS", "ADD_ERROR", "REMOVE_SUCCESS"],
    services: ["videoService"], // e.g., for encapsulating business logic
    permissions: ["canUploadVideo", "canDeleteVideo"], // access control layer
    layouts: ["VideoLayout"], // for shared page layout (Next.js)
    providers: ["VideoProvider"], // context/provider (React Context API)
    tests: {
      // todo : can add an option field to generate test files with individual sections like components , serveractions , etc
      components: ["VideoUploadForm.test.tsx"],
      api: ["upload.test.ts"],
      utils: ["formatDuration.test.ts"],
    },
    mockData: ["mockVideoData.ts"], // useful for testing/demo
    env: ["VIDEO_UPLOAD_URL", "MAX_VIDEO_SIZE_MB"], // env var template entries
    readme: true, // optionally generate a README.md per feature
  },
];
*/
