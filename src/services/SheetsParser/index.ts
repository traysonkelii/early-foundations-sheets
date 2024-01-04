import { SheetsBannerParser } from "./SheetsBannerParser";
import { SheetsCardParser } from "./SheetsCardParser";
import { SheetsTextParser } from "./SheetsTextParser";
import { SheetsTitleParser } from "./SheetsTitleParser";
import { SheetsMultiTextParser } from "./SheetsMultiTextParser";
import { SheetsButtonParser } from "./SheetsButtonParser";
import {
  SheetsBannerData,
  SheetsBioData,
  SheetsButton,
  SheetsJobLink,
  SheetsMultiTextData,
  SheetsSchoolCardData,
  SheetsTextData,
  SheetsTitleData,
} from "./models";
import { SheetsBioParser } from "./SheetsBioParser";
import { SheetsJobLinkParser } from "./SheetsJobLinkParser";
import { SheetsTabParser } from "./SheetsTabNameParser";
import { SheetsLinkParser } from "./SheetsLinkParser";

export interface SheetsData {
  text?: SheetsTextData;
  banner?: SheetsBannerData;
  title?: SheetsTitleData;
  multiText?: SheetsMultiTextData;
  button?: SheetsButton;
  cards?: SheetsSchoolCardData[];
  bios?: SheetsBioData[];
  jobs?: SheetsJobLink[];
  subtext?: SheetsTextData;
  tabName?: string;
  subHeaders?: string[];
  privacyPolicyLink?: SheetsTextData;
  termsLink?: string;
}

export const SheetsParser = (sheetsData: any): SheetsData => {
  const contentArray: string[][] = sheetsData.data;
  const content: SheetsData = { cards: [], bios: [], jobs: [], subHeaders: [] };
  if (contentArray) {
    contentArray.forEach((row) => {
      const key = row[0];
      switch (key) {
        case "text":
          content.text = SheetsTextParser(row);
          break;
        case "banner":
          content.banner = SheetsBannerParser(row);
          break;
        case "title":
          content.title = SheetsTitleParser(row);
          break;
        case "multi-text":
          content.multiText = SheetsMultiTextParser(row);
        case "button":
          content.button = SheetsButtonParser(row);
        case "card":
          content.cards?.push(SheetsCardParser(row));
          break;
        case "bio":
          content.bios?.push(SheetsBioParser(row));
          break;
        case "subtext":
          content.subtext = SheetsTextParser(row);
          break;
        case "jobLink":
          content.jobs?.push(SheetsJobLinkParser(row));
          break;
        case "tabName":
          content.tabName = SheetsTabParser(row);
        case "subHeader":
          content.subHeaders = SheetsMultiTextParser(row).value;
        case "privacyPolicyLink":
          content.privacyPolicyLink = SheetsTextParser(row);
        case "termsLink":
          content.termsLink = SheetsLinkParser(row);
        default:
      }
    });
  }
  return content;
};
