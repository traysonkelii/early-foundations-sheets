import { SheetsBannerParser } from "./SheetsBannerParser";
import { SheetsCardParser } from "./SheetsCardParser";
import { SheetsTextParser } from "./SheetsTextParser";
import { SheetsTitleParser } from "./SheetsTitleParser";
import { SheetsMultiTextParser } from "./SheetsMultiTextParser";
import { SheetsButtonParser } from "./SheetsButtonParser";

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
      case "multi-text":
        content.set("multi-text", SheetsMultiTextParser(row));
      case "button":
        content.set("button", SheetsButtonParser(row))
      case "card":
        cards.push(SheetsCardParser(row));
        content.set("card", cards);
        break;
      default:
    }
  });
  return content;
};
