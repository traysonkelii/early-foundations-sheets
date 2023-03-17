import { parseText } from "./helper";
import { SheetsButton } from "./models";

export const SheetsButtonParser = (rawSheetsText: string[]): SheetsButton => {
  const displayValue = parseText(rawSheetsText[2]);
  const link = parseText(rawSheetsText[3]) ?? '';

  return { displayValue, link };
};
