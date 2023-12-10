import { parseText } from "./helpers";

export const SheetsLinkParser = (rawSheetsText: string[]): string =>
  parseText(rawSheetsText[2]);
