import { parseText } from "./helper";

export const SheetsMultiTextParser = (rawSheetsText: string[]) => {
  const value = rawSheetsText.filter((text, index) => index > 1).map(text => parseText(text));
  return { value };
};
