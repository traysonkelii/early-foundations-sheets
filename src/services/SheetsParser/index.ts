import { SheetsBannerParser } from "./SheetsBannerParser";
import { SheetsCardParser } from "./SheetsCardParser";
import { SheetsTextParser } from "./SheetsTextParser";
import { SheetsTitleParser } from "./SheetsTitleParser";

export const SheetsParser = (sheetsData: any) => {
  const contentArray: string[][] = sheetsData.data;
  const content = new Map();
  const cards: any[] = [];
  contentArray.forEach((row) => {
    const key = row[0];
    switch (key) {
      case "text":
        content.set("text", SheetsTextParser(row));
        break;
      case "banner":
        content.set("banner", SheetsBannerParser(row));
        break;
      case "title":
        content.set("title", SheetsTitleParser(row));
        break;
      case "card":
        cards.push(SheetsCardParser(row));
        content.set("card", cards);
        break;
      default:
    }
  });
  return content;
};

/**
 * for each array in data
 * read the first item to find out the type
 * for the given type map it to the proper parser
 *
 */
