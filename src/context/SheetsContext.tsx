import { buildRangeBasePath } from "@/pages/api/sheets";
import { SchoolCardData } from "@/pages/schools/components/SchoolCard";
import { SchoolState } from "@/pages/schools/components/SchoolMap";
import { SchoolStateParser } from "@/services/SchoolStateParser";
import { SheetsParser } from "@/services/SheetsParser";
import { SheetsButton } from "@/services/SheetsParser/models";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export interface Base {
  bannerUrl?: string;
  text?: string;
  title?: string;
}

export interface HomeData extends Base {}
export interface AboutData extends Base {}
export interface ApproachData extends Base {
  multiText: string[];
  button: SheetsButton;
}
export interface SchoolsData extends Base {
  cards: SchoolCardData[];
  schoolStates: SchoolState[];
}
export interface TeamData extends Base {}

export interface SheetsContext {
  homeContext: HomeData;
  aboutContext: AboutData;
  schoolsContext: SchoolsData;
  approachContext: ApproachData;
  teamContext: TeamData;
}

const SheetsContext = createContext<SheetsContext>({
  homeContext: {},
  aboutContext: {},
  schoolsContext: { cards: [], schoolStates: [] },
  approachContext: {
    multiText: [],
    button: { displayValue: "" },
  },
  teamContext: {},
});

export const useSheetsContext = () => useContext<SheetsContext>(SheetsContext);

interface SheetsContextProviderProps {
  children: ReactNode;
}

export const SheetsContextProvider = ({
  children,
}: SheetsContextProviderProps) => {
  const [homeData, setHomeData] = useState<HomeData>({});
  const [aboutData, setAboutData] = useState<AboutData>({});
  const [schoolData, setSchoolData] = useState<SchoolsData>({
    cards: [],
    schoolStates: [],
  });
  const [approachData, setApproachData] = useState<ApproachData>({
    multiText: [],
    button: { displayValue: "" },
  });
  const [teamData, setTeamData] = useState<TeamData>({});

  useEffect(() => {
    const homeCall = fetch(buildRangeBasePath("home!A1:Z40")).then((res) =>
      res.json()
    );
    const aboutCall = fetch(buildRangeBasePath("about!A1:E6")).then((res) =>
      res.json()
    );
    const schoolCall = fetch(buildRangeBasePath("our-schools!A1:Z60")).then(
      (res) => res.json()
    );
    const approachCall = fetch(buildRangeBasePath("approach!A1:Z20")).then(
      (res) => res.json()
    );

    Promise.all([homeCall, aboutCall, schoolCall, approachCall]).then(
      ([homeRes, aboutRes, schoolRes, approachRes]) => {
        const homeContent = SheetsParser(homeRes);
        setHomeData({
          text: homeContent.get("text").text,
          bannerUrl: homeContent.get("banner").bannerUrl,
        });

        const aboutContent = SheetsParser(aboutRes);
        setAboutData({
          text: aboutContent.get("text").text,
          bannerUrl: aboutContent.get("banner").bannerUrl,
          title: aboutContent.get("title").titleText,
        });

        const schoolContent = SheetsParser(schoolRes);
        const schoolStates = SchoolStateParser(schoolContent.get("card"));
        setSchoolData({
          text: schoolContent.get("text").text,
          bannerUrl: schoolContent.get("banner").bannerUrl,
          title: schoolContent.get("title").titleText,
          cards: schoolContent.get("card"),
          schoolStates: schoolStates,
        });

        const approachContent = SheetsParser(approachRes);
        setApproachData({
          multiText: approachContent.get("multi-text").value,
          bannerUrl: approachContent.get("banner").bannerUrl,
          title: approachContent.get("title").titleText,
          button: approachContent.get("button"),
        });
      }
    );
  }, []);

  const contextValue: SheetsContext = {
    homeContext: homeData,
    aboutContext: aboutData,
    schoolsContext: schoolData,
    approachContext: approachData,
    teamContext: teamData,
  };

  return (
    <SheetsContext.Provider value={contextValue}>
      {children}
    </SheetsContext.Provider>
  );
};
