import { parseText } from "./helpers";
import { SheetsMultiTextData } from "./models";

export const SheetsMultiTextParser = (rawSheetsText: string[]): SheetsMultiTextData => {
  const value = rawSheetsText.filter((text, index) => index > 1).map(text => parseText(text));
  return { value };
};
