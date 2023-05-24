import { SheetsJobLink } from "./models";

export const SheetsJobLinkParser = (rawSheetsText: string[]): SheetsJobLink => {
  const title = rawSheetsText[2];
  const link = rawSheetsText[3];

  return { title, link };
};
