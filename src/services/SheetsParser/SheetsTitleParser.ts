export const SheetsTitleParser = (rawSheetsTitle: string[]) => {
  const titleText = rawSheetsTitle[2] !== undefined ? rawSheetsTitle[2] : '';
  return { titleText };
};
