import { ActionType } from "plop";
import { FeatureConfig } from "../../types/types";
import { targetPaths } from "../target-paths";
import { templatePaths } from "../template-paths";

export const GenerateActionsForServerActions = (
  feature: FeatureConfig,
  actions: ActionType[]
) => {
  const serverActions = feature.serverActions;

  // 1. Handle CRUD generation
  if (serverActions?.generateCRUD) {
    actions.push({
      type: "add",
      path: targetPaths.serverActions.serverAction(feature.name, "crud"),
      templateFile: templatePaths.serverActions.serverActionsCRUD,
      data: {
        name: feature.name, // For pascalCase, camelCase
        schemaName: feature.name, // or use a different one if needed
      },
    });
  }

  // 2. Handle custom server actions
  if (serverActions?.custom?.length) {
    serverActions.custom.forEach((customAction) => {
      function updateServerActionName() {
        const op = customAction.operation.toLowerCase();
        const prefix = op === "read" ? "get" : op;
        customAction.name = `${prefix}${customAction.name}`;
      }
      updateServerActionName();
      actions.push({
        type: "add",
        path: targetPaths.serverActions.serverAction(
          feature.name,
          "custom",
          customAction
        ),
        templateFile: templatePaths.serverActions.serverActionsCustom,
        data: {
          ...customAction,
          featureName: feature.name,
        },
      });
    });
  }
  // 3. Handle server action index file
  if (serverActions?.generateCRUD || serverActions?.custom?.length) {
    const customActions =
      serverActions.custom?.map((action) => ({
        name: action.name,
      })) ?? [];

    actions.push({
      type: "add",
      path: targetPaths.serverActions.serverActionsIndex(feature.name),
      templateFile: templatePaths.serverActions.serverActionsIndex,
      data: {
        name: feature.name,
        customActions,
      },
    });
  }
};
