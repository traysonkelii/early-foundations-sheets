import { parseText } from "./helpers";
import { SheetsTextData } from "./models";

export const SheetsTextParser = (rawSheetsText: string[]): SheetsTextData => {
  const value = parseText(rawSheetsText[2]);
  return { value };
};

