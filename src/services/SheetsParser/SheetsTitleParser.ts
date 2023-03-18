import { SheetsTitleData } from "./models";

export const SheetsTitleParser = (rawSheetsTitle: string[]): SheetsTitleData => {
  const value = rawSheetsTitle[2] !== undefined ? rawSheetsTitle[2] : '';
  return { value };
};
