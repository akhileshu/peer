import { ActionType } from "plop";
import {
  ComponentConfig,
  ComponentKind,
  FormAction,
  PageType,
  RenderType,
  UIConfig,
} from "../../types/component-config";
import { FeatureConfig } from "../../types/types";
import { stringHelpers } from "../helpers";
import { targetPaths } from "../target-paths";
import { templatePaths } from "../template-paths";

export const GenerateActionsForFeatureComponents = (
  feature: FeatureConfig,
  actions: ActionType[]
) => {
  if (!feature.components?.length) return;

  feature.components.forEach((componentConfig) => {
    componentConfig.UIs?.forEach((UIConfig) => {
      addUI(UIConfig, feature, actions);
    });

    switch (componentConfig.kind) {
      case ComponentKind.Page:
        addPage(componentConfig, feature, actions);
        break;
      case ComponentKind.ComponentRender:
        addComponentRender(componentConfig, feature, actions);
        break;
      case ComponentKind.ComponentForm:
        addComponentForm(componentConfig, feature, actions);
        break;
    }
  });
};

function addPage(
  config: Extract<ComponentConfig, { kind: ComponentKind.Page }>,
  feature: FeatureConfig,
  actions: ActionType[]
) {
  const { name, restResource, pages, forms } = config;

  pages.forEach((pageType: PageType) => {
    const isList = pageType === "list";
    const isEditableView = config.forms?.includes("edit");
    const pageSegment = isList ? "" : "[id]";
    const pagePath = targetPaths.components.page(
      `${restResource}/${pageSegment}`
    );
    const viewPath = targetPaths.components.view(
      { featureName: feature.name, componentName: name },
      isList
    );

    actions.push({
      type: "add",
      path: pagePath,
      templateFile: templatePaths.components.page,
      data: { name },
    });

    actions.push({
      type: "add",
      path: viewPath,
      templateFile: templatePaths.components.view(isList),
      data: { name, renderAsList: isList, isEditableView },
    });
  });

  forms?.forEach((formType: FormAction) =>
    addComponentForm(
      { name, kind: ComponentKind.ComponentForm, forms: [formType] },
      feature,
      actions
    )
  );
}

function addComponentRender(
  config: Extract<ComponentConfig, { kind: ComponentKind.ComponentRender }>,
  feature: FeatureConfig,
  actions: ActionType[]
) {
  const { name, renderTypes } = config;

  renderTypes.forEach((renderType: RenderType) => {
    const isList = renderType === "list";
    // @ts-ignore Reason: Unsafe type.
    const isEditableView = config.forms?.includes("edit");
    actions.push({
      type: "add",
      path: targetPaths.components.view(
        { featureName: feature.name, componentName: name },
        isList
      ),
      templateFile: templatePaths.components.view(isList),
      data: { name, renderAsList: isList, isEditableView },
    });
  });
}

function addComponentForm(
  config: Extract<ComponentConfig, { kind: ComponentKind.ComponentForm }>,
  feature: FeatureConfig,
  actions: ActionType[]
) {
  const { name, forms } = config;

  forms.forEach((formType: FormAction) => {
    actions.push({
      type: "add",
      path: targetPaths.components.form(
        { featureName: feature.name, componentName: name },
        formType
      ),
      templateFile: getTemplateFilePath(
        `form${stringHelpers.toPascalCase(formType)}`
      ),
      data: { name },
    });
  });
}

function addUI(
  UIConfig: UIConfig,
  feature: FeatureConfig,
  actions: ActionType[]
) {
  const { name, type } = UIConfig;
  const flag = `is${stringHelpers.toPascalCase(type)}Component`;
  const data = { name, [flag]: true };

  actions.push({
    type: "add",
    path: targetPaths.components.ui(
      { featureName: feature.name, componentName: name },
      type
    ),
    templateFile: templatePaths.components.uiComponent,
    data,
  });
}

function getTemplateFilePath(key: string): string {
  const templateFilePath =
    templatePaths.components[key as keyof typeof templatePaths.components];
  if (!templateFilePath) {
    throw new Error(
      `Template file for key "${key}" not found in templatePaths.components`
    );
  }
  return templateFilePath as string;
}
