import { parseText } from "./helpers";

export const SheetsTabParser = (rawSheetsText: string[]): string =>  parseText(rawSheetsText[2]);

