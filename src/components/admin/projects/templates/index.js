import { processTemplates } from "./processTemplates";
import { teamTemplates } from "./teamTemplates";
import { otherTemplates } from "./otherTemplates";

export const templates = [
  ...processTemplates,
  ...teamTemplates,
  ...otherTemplates,
];

