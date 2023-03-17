import { SchoolCardData } from "@/pages/schools/components/SchoolCard";

export const SheetsCardParser = (rawSheetsText: string[]): SchoolCardData => {
  const data: SchoolCardData = {
    title: rawSheetsText[2],
    url: rawSheetsText[3],
    address: rawSheetsText[5],
    cityState: rawSheetsText[4],
    image: rawSheetsText[6],
    lat: Number(rawSheetsText[7]),
    long: Number(rawSheetsText[8]),
    stateSymbol: rawSheetsText[9]
  };

  return data;
};
