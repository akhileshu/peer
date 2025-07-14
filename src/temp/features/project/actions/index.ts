
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from "./project-crud-actions";

import { getProjectWithMVP } from "./get-project-with-mvp";
import { getTimelineWithPhases } from "./get-timeline-with-phases";
import { getProjectFeatures } from "./get-project-features";

export const projectActions = {
  getAll: getProjects,
  getById: getProjectById,
  create: createProject,
  update: updateProject,
  delete: deleteProject,
  getProjectWithMVP: getProjectWithMVP,
  getTimelineWithPhases: getTimelineWithPhases,
  getProjectFeatures: getProjectFeatures,
};
