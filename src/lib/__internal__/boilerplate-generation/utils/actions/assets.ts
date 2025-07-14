import { ActionType } from "plop";
import { FeatureConfig } from "../../types/types";
import { targetPaths } from "../target-paths";
import { templatePaths } from "../template-paths";

export const GenerateActionsForFeatureAssets = (
  feature: FeatureConfig,
  actions: ActionType[]
) => {
  const {
    zodSchemas,
    hooks,
    types,
    utils,
    constants,
    prismaModels,
    name: featureName,
  } = feature;

  let templateFile = templatePaths.zodSchema;
  zodSchemas?.forEach(({ resourceName, type }) => {
    type.forEach((schemaType) => {
      actions.push({
        type: "add",
        path: targetPaths.schema({
          feature: featureName,
          name: resourceName,
          type: schemaType,
        }),
        templateFile,
        data: {
          name: resourceName,
          type: schemaType,
          isMainSchema: true,
        },
      });
    });
  });

  const flatZodSchemas = zodSchemas?.flatMap(({ resourceName, type }) =>
    type.map((schemaType) => ({ resourceName, type: schemaType }))
  );

  if (flatZodSchemas?.length) {
    actions.push({
      type: "add",
      path: targetPaths.schemaIndex({ feature: featureName }),
      templateFile,
      data: {
        zodSchemas: flatZodSchemas,
        isExportSchema: true,
      },
      force: true,
    });
  }

  // Loop through asset types and add actions using shared template
  const assetConfigs: {
    items: string[] | undefined;
    getPath: (args: { feature: string; name: string }) => string;
    flag: string;
  }[] = [
    { items: hooks, getPath: targetPaths.hook, flag: "isHook" },
    { items: types, getPath: targetPaths.type, flag: "isType" },
    { items: utils, getPath: targetPaths.util, flag: "isUtils" },
    { items: constants, getPath: targetPaths.constant, flag: "isConstant" },
    {
      items: prismaModels,
      getPath: targetPaths.prismaModel,
      flag: "isPrismaModel",
    },
  ];
  templateFile = templatePaths.multiFileTemplate;
  assetConfigs.forEach(({ items, getPath, flag }) => {
    items?.forEach((name) => {
      actions.push({
        type: "add",
        path: getPath({ feature: featureName, name }),
        templateFile,
        data: { name, [flag]: true },
      });
    });
  });
};
