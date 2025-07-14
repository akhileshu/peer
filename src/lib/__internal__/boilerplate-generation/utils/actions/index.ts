import { ActionType } from "plop";
import { FeatureConfig } from "../../types/types";
import { GenerateActionsForFeatureAssets } from "./assets";
import { GenerateActionsForFeatureComponents } from "./components";
import { GenerateActionsForServerActions } from "./serverActions";

export const getActionsForFeature = (feature: FeatureConfig) => {
  const actions: ActionType[] = [];

  GenerateActionsForServerActions(feature, actions);
  GenerateActionsForFeatureComponents(feature, actions);
  GenerateActionsForFeatureAssets(feature, actions);

  return actions;
};
