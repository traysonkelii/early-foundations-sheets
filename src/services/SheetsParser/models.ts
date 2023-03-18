export interface SheetsButton {
  displayValue: string;
  onClick?: any;
  link?: string;
}

export interface SheetsMultiTextData {
  value: string[];
}

export interface SheetsTextData {
  value: string;
}

export interface SheetsTitleData {
  value: string;
}

export interface SheetsSchoolCardData {
  title: string;
  url: string;
  address: string;
  cityState: string;
  image: string;
  lat?: number;
  long?: number;
  stateSymbol?: string;
}

export interface SheetsBannerData {
  imgSource: string;
}

export interface SheetsBioData {
  name: string;
  title: string;
  desc: string[];
}
