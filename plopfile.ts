import { Question } from "inquirer";
import { NodePlopAPI } from "plop";
import { featuresList } from "./src/lib/boilerplate-generation/features.json";
import { PlopData } from "./src/lib/boilerplate-generation/types/types";
import { registerHelpers } from "./src/lib/boilerplate-generation/utils/helpers";
import {
  getDefaultParts,
  getPartChoices,
} from "./src/lib/boilerplate-generation/utils/prompts";
import { getActionsForFeature } from "./src/lib/boilerplate-generation/utils/actions";

/**
 *
 * - ✖  ++ Cannot read properties of undefined (reading 'replace')
 * - this kind of plop errors can happen if using undeclared plop helpers error in plop helper function or any other similar error in process of hbs template to code generation
 *
 * - saw a bug while debugging plop with node inspect flag , breakpoint doesn't trigger unless i run plop once in normal flow;
 */
export default function generate(plop: NodePlopAPI) {
  debugger;
  registerHelpers(plop);

  // Main generator
  plop.setGenerator("feature", {
    description: "Generate a new feature with all boilerplate",
    prompts: [
      {
        type: "list",
        name: "featureName",
        message: "Select feature to generate:",
        choices: featuresList.map((f) => f.name),
      },
      {
        type: "checkbox",
        name: "partsToGenerate",
        message: "Select parts to generate:",
        choices: (answers: PlopData) =>
          getPartChoices(
            featuresList.find((f) => f.name === answers.featureName)!
          ),
        default: (answers: PlopData) =>
          getDefaultParts(
            featuresList.find((f) => f.name === answers.featureName)!
          ),
      } as Question,
    ],
    actions: function (data) {
      const { featureName } = data as PlopData;
      const featureConfig = featuresList.find((f) => f.name === featureName)!;
      return getActionsForFeature(featureConfig);
    },
  });
}
