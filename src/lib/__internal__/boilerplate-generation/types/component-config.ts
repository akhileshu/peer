export type PageType = "list" | "detail";
export type RenderType = "list" | "detail";
// Usage convention: UI uses "edit", API/actions use "update"
export type FormAction = "create" | "edit" | "delete";
export type UIType = "table" | "modal";
export type UIConfig = {
  type: UIType;
  name: string;
};

export enum ComponentKind {
  Page = "page",
  ComponentRender = "componentRender",
  ComponentForm = "componentForm",
}

type Base = {
  name: string;
  kind: ComponentKind;
  UIs?: UIConfig[];
  //
  pages?: PageType[];
  renderTypes?: RenderType[];
  forms?: FormAction[];
};

type Page = Base & {
  kind: ComponentKind.Page;
  restResource: string;
  pages: PageType[];
  forms?: FormAction[];
};

type ComponentRender = Base & {
  kind: ComponentKind.ComponentRender;
  renderTypes: RenderType[];
  pages?: undefined;
  restResource?: undefined;
  forms?: undefined;
};

type ComponentForm = Base & {
  kind: ComponentKind.ComponentForm;
  forms: FormAction[];
  pages?: undefined;
  restResource?: undefined;
  renderTypes?: undefined;
};

/**
 *- /templates → list
 *- /templates/create → create
 *- /templates/:id → view, edit, delete
 */
export type ComponentConfig = Page | ComponentRender | ComponentForm;
// todo - ui pendig to be added - to review

/*
export type UIType = "table" | "modal";
type FeatureComponents = {
  ui?: Partial<Record<UIType, {
  name: string;
  option?: {
    generateTestFile?: boolean;
  };
}[]>>;
};
*/
