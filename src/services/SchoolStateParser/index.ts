import { SchoolCardData } from "@/pages/schools/components/SchoolCard";
import { SchoolState } from "@/pages/schools/components/SchoolMap";

export const SchoolStateParser = (schools: SchoolCardData[]) => {

  const schoolStates: SchoolState[] = schools.map((school) => {
    const schoolState: SchoolState = {
      id: school.stateSymbol ? school.stateSymbol : "NO SYMBOL PROVIDED",
      val: getVal(school.stateSymbol ? school.stateSymbol : ""),
      lat: school.lat ?? 0,
      lon: school.long ?? 0,
      name: school.title,
      url: school.url,
    };
    return schoolState
  });

  return schoolStates;
};

const getVal = (state: string) => {
  switch (state) {
    case "AL":
      return "01";
    case "AK":
      return "02";
    case "AS":
      return "60";
    case "AZ":
      return "04";
    case "AR":
      return "05";
    case "CA":
      return "06";
    case "CO":
      return "08";
    case "CT":
      return "09";
    case "DE":
      return "10";
    case "DC":
      return "11";
    case "FL":
      return "12";
    case "FM":
      return "64";
    case "GA":
      return "13";
    case "GU":
      return "66";
    case "HI":
      return "15";
    case "ID":
      return "16";
    case "IL":
      return "17";
    case "IN":
      return "18";
    case "IA":
      return "19";
    case "KS":
      return "20";
    case "KY":
      return "21";
    case "LA":
      return "22";
    case "ME":
      return "23";
    case "MH":
      return "68";
    case "MD":
      return "24";
    case "MA":
      return "25";
    case "MI":
      return "26";
    case "MN":
      return "27";
    case "MS":
      return "28";
    case "MO":
      return "29";
    case "MT":
      return "30";
    case "NE":
      return "31";
    case "NV":
      return "32";
    case "NH":
      return "33";
    case "NJ":
      return "34";
    case "NM":
      return "35";
    case "NY":
      return "36";
    case "NC":
      return "37";
    case "ND":
      return "38";
    case "MP":
      return "69";
    case "OH":
      return "39";
    case "OK":
      return "40";
    case "OR":
      return "41";
    case "PW":
      return "70";
    case "PA":
      return "42";
    case "PR":
      return "72";
    case "RI":
      return "44";
    case "SC":
      return "45";
    case "SD":
      return "46";
    case "TN":
      return "47";
    case "TX":
      return "48";
    case "UM":
      return "74";
    case "UT":
      return "49";
    case "VT":
      return "50";
    case "VA":
      return "51";
    case "VI":
      return "78";
    case "WA":
      return "53";
    case "WV":
      return "54";
    case "WI":
      return "55";
    case "WY":
      return "56";
    default:
      return "ERROR";
  }
};
