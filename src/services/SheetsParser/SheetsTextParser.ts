import { parseText } from "./helper";

export const SheetsTextParser = (rawSheetsText: string[]) => {
  const text = parseText(rawSheetsText[2]);
  return { text };
};
