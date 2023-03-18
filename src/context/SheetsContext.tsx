import { buildRangeBasePath } from "@/pages/api/sheets";
import { SchoolState } from "@/pages/schools/components/SchoolMap";
import { SchoolStateParser } from "@/services/SchoolStateParser";
import { SheetsParser } from "@/services/SheetsParser";
import { SheetsBioData, SheetsButton, SheetsSchoolCardData } from "@/services/SheetsParser/models";

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
  cards: SheetsSchoolCardData[];
  schoolStates: SchoolState[];
}
export interface TeamData extends Base {
  bios: SheetsBioData[];
}

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
  teamContext: {bios: []},
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
  const [teamData, setTeamData] = useState<TeamData>({bios: []});

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
    const teamCall = fetch(buildRangeBasePath("team!A1:Z30")).then(
      (res) => res.json()
    );

    Promise.all([homeCall, aboutCall, schoolCall, approachCall, teamCall]).then(
      ([homeRes, aboutRes, schoolRes, approachRes, teamRes]) => {
        const homeContent = SheetsParser(homeRes);
        setHomeData({
          text: homeContent.text?.value,
          bannerUrl: homeContent.banner?.imgSource,
        });

        const aboutContent = SheetsParser(aboutRes);
        setAboutData({
          text: aboutContent.text?.value,
          bannerUrl: aboutContent.banner?.imgSource,
          title: aboutContent.title?.value,
        });

        const schoolContent = SheetsParser(schoolRes);
        const schoolStates = SchoolStateParser(schoolContent.cards ?? []);
        setSchoolData({
          text: schoolContent.text?.value,
          bannerUrl: schoolContent.banner?.imgSource,
          title: schoolContent.title?.value,
          cards: schoolContent.cards ?? [],
          schoolStates: schoolStates,
        });

        const approachContent = SheetsParser(approachRes);
        setApproachData({
          multiText: approachContent.multiText?.value ?? [],
          bannerUrl: approachContent.banner?.imgSource,
          title: approachContent.title?.value,
          button: approachContent.button || {displayValue: 'default button'}
        });

        const teamContent = SheetsParser(teamRes);
        console.log(teamRes);
        setTeamData({
          title: teamContent.title?.value,
          bannerUrl: teamContent.banner?.imgSource,
          bios: teamContent.bios ?? [],
        })
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
