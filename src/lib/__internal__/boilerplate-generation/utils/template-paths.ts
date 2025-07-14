const templateBasePath = "src/lib/boilerplate-generation/plop-templates";
const t = (path: string) => `${templateBasePath}/${path}`;

export const templatePaths = {
  components: {
    renderServer: t("/components/render-server.hbs"),
    view: (renderAsList: boolean) =>
      renderAsList
        ? t("/components/list-view.hbs")
        : t("/components/detail-view.hbs"),
    page: t("/components/page.hbs"),
    formCreate: t("/components/form-create.hbs"),
    formEdit: t("/components/form-edit.hbs"),
    formDelete: t("/components/form-delete.hbs"),
    uiComponent: t("/components/ui-component.hbs"),
  },
  serverActions: {
    serverActionsCRUD: t("/server-actions/serverActionsCRUD.hbs"),
    serverActionsCustom: t("/server-actions/serverActionsCustom.hbs"),
    serverActionsIndex: t("/server-actions/index.hbs"),
  },
  zodSchema: t("/zod-schema.hbs"),

  multiFileTemplate: t("/multi-file-template.hbs"),
};
