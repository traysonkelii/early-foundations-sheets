export const SheetsBannerParser = (rawBannerText: string[]) => {
  const bannerUrl = rawBannerText[2];
  return { bannerUrl };
};
