import { parseText } from "./helpers";
import { SheetsBioData } from "./models";

export const SheetsBioParser = (rawSheetsText: string[]): SheetsBioData => {
  const name = rawSheetsText[2];
  const title = rawSheetsText[3];
  const desc = rawSheetsText
    .filter((text, index) => index > 3)
    .map((text) => parseText(text));

  return { name, title, desc };
};
