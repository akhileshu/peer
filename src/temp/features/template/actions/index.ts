
import {
  getTemplates,
  getTemplateById,
  createTemplate,
  updateTemplate,
  deleteTemplate,
} from "./template-crud-actions";

import { getTemplateSampleProjects } from "./get-template-sample-projects";
import { createProjectFromTemplate } from "./create-project-from-template";

export const templateActions = {
  getAll: getTemplates,
  getById: getTemplateById,
  create: createTemplate,
  update: updateTemplate,
  delete: deleteTemplate,
  getTemplateSampleProjects: getTemplateSampleProjects,
  createProjectFromTemplate: createProjectFromTemplate,
};
