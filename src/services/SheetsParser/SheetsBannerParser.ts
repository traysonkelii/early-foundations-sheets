import { SheetsBannerData } from "./models";

export const SheetsBannerParser = (
  rawBannerText: string[]
): SheetsBannerData => {
  const imgSource = rawBannerText[2];
  return { imgSource };
};
