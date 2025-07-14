import { CRUDOperation } from "../types/types";
import { stringHelpers } from "./helpers";

const featureBasePath = "src/features";
// const f = (path: string) => `${featureBasePath}${path}`;
function toKebabPath(...parts: string[]): string {
  return parts
    .filter(Boolean)
    .map((part) => stringHelpers.kebabCaseJoin(part))
    .join("/");
}

const f = (...parts: string[]) => `${featureBasePath}/${toKebabPath(...parts)}`;

type FeaturePathParams = {
  feature: string;
  name: string;
};

type ComponentPathParams = {
  featureName: string;
  componentName: string;
};

type ServerActionType = "custom" | "crud";

export const targetPaths = {
  /** ex: schema("video", "createTemplateSchema") → src/features/video/schemas/createTemplateSchema.ts */
  schema: ({
    feature,
    type,
    name,
  }: {
    feature: string;
    type: string;
    name: string;
  }) =>
    f(
      `/${feature}/schemas/${stringHelpers.kebabCaseJoin(
        type,
        name,
        "Schema.ts"
      )}`
    ),
  schemaIndex: ({ feature }: { feature: string }) =>
    f(`/${feature}/schemas/index.ts`),

  /** ex: hook("video", "uploadVideo") → src/features/video/hooks/useUploadVideo.ts */
  hook: ({ feature, name }: FeaturePathParams) =>
    f(`/${feature}/hooks/use${stringHelpers.toPascalCase(name)}.ts`),

  /** ex: type("video", "video") → src/features/video/types/videoTypes.ts */
  type: ({ feature, name }: FeaturePathParams) =>
    f(`/${feature}/types/${name}Types.ts`),

  /** ex: util("video", "formatDuration") → src/features/video/utils/formatDuration.ts */
  util: ({ feature, name }: FeaturePathParams) =>
    f(`/${feature}/utils/${name}.ts`),

  /** ex: constant("video", "videoStatus") → src/features/video/constants/videoStatus.ts */
  constant: ({ feature, name }: FeaturePathParams) =>
    f(`/${feature}/constants/${name}.ts`),
  /** ex: prismaModel("user") → prisma/models/user.prisma */
  prismaModel: ({ name }: FeaturePathParams) => `prisma/models/${name}.prisma`,

  components: {
    /**- User-List-View.tsx
     * - User-Detail-View.tsx
     *  - ex: renderClient({...}, false) → .../User-Detail-Card.tsx | true → .../User-List-View.tsx */
    view: (
      { featureName, componentName }: ComponentPathParams,
      renderAsList: boolean
    ) =>
      f(
        `/${featureName}/components/${componentName}/${stringHelpers.kebabCaseJoin(
          componentName,
          renderAsList ? "List-View" : "Detail-View"
        )}.tsx`
      ),

    /** ex: src/app/(with-layout)/video/upload/page.tsx */
    // page: (page: string) => `src/app/(with-layout)/${page}/page.tsx`,
    page: (pageFileNamePattern: string) =>
      `src/app/(with-layout)/${pageFileNamePattern}/page.tsx`,

    /** ex: form({...}, "edit") → .../edit-user-form.tsx */
    form: (
      { featureName, componentName }: ComponentPathParams,
      formType: string
    ) =>
      f(
        `/${featureName}/components/${componentName}/${stringHelpers.kebabCaseJoin(
          formType,
          componentName,
          "form"
        )}.tsx`
      ),

    /** ex: ui({...}, "table") → .../user-table.tsx */
    ui: ({ featureName, componentName }: ComponentPathParams, uiType: string) =>
      f(
        `/${featureName}/components/${componentName}/${stringHelpers.kebabCaseJoin(
          componentName,
          uiType
        )}.tsx`
      ),
  },

  serverActions: {
    /** ex: serverAction("video", "crud") → .../video-crud-actions.tsx | "custom", "read" → .../video-read-action.tsx */
    serverAction: (
      featureName: string,
      type: ServerActionType,
      customAction?: {
        operation: CRUDOperation;
        name: string;
      }
    ) =>
      f(
        `/${featureName}/actions/${stringHelpers.kebabCaseJoin(
          type === "custom"
            ? stringHelpers.toKebabCase(
                customAction?.name || "error_custom-action-name-not-specified"
              )
            : `${featureName}-crud-actions`
        )}.tsx`
      ),

    /** ex: serverActionsIndex("video") → .../actions/index.ts */
    serverActionsIndex: (featureName: string) =>
      f(`/${featureName}/actions/index.ts`),
  },

  /** ⚠️ untested , ex: componentTest("video", "upload") → .../upload.test.tsx */
  componentTest: ({ feature, name }: FeaturePathParams) =>
    f(`/${feature}/components/${name}/${name}.test.tsx`),
};
