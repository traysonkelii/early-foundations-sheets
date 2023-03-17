import { SchoolCardData } from "@/pages/schools/components/SchoolCard";
import { SheetsParser } from "@/services/SheetsParser";

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
export interface SchoolsData extends Base {
  cards: SchoolCardData[];
}

export interface SheetsContext {
  homeContext: HomeData;
  setHomeContext: (homeData: HomeData) => void;

  aboutContext: AboutData;
  setAboutContext: (aboutData: AboutData) => void;

  schoolsContext: SchoolsData;
  setSchoolsContext: (schoolData: SchoolsData) => void;
}

const SheetsContext = createContext<SheetsContext>({
  homeContext: { bannerUrl: "" },
  setHomeContext: () => {},
  aboutContext: { bannerUrl: "" },
  setAboutContext: () => {},
  schoolsContext: { bannerUrl: "", cards: [] },
  setSchoolsContext: () => {},
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
  const [schoolData, setSchoolData] = useState<SchoolsData>({cards: []});

  useEffect(() => {
    const homeCall = fetch("/api/getHome").then((res) => res.json());
    const aboutCall = fetch("/api/getAbout").then((res) => res.json());
    const schoolCall = fetch("/api/getSchools").then((res) => res.json());

    Promise.all([homeCall, aboutCall, schoolCall]).then(
      ([homeRes, aboutRes, schoolRes]) => {
        const homeContent = SheetsParser(homeRes);
        setHomeData({
          text: homeContent.get("text").text,
          bannerUrl: homeContent.get("banner").bannerUrl,
        });

        const aboutContent = SheetsParser(aboutRes);
        setAboutData({
          text: aboutContent.get('text').text,
          bannerUrl: aboutContent.get('banner').bannerUrl,
          title: aboutContent.get('title').titleText,
        });

        const schoolContent = SheetsParser(schoolRes);
        setSchoolData({
          text: schoolContent.get('text').text,
          bannerUrl: schoolContent.get('banner').bannerUrl,
          title: schoolContent.get('title').titleText,
          cards: schoolContent.get('card')
        });
        
      }
    );
  }, []);

  const contextValue: SheetsContext = {
    homeContext: homeData,
    setHomeContext: setHomeData,
    aboutContext: aboutData,
    setAboutContext: setAboutData,
    schoolsContext: schoolData,
    setSchoolsContext: setSchoolData,
  };

  return (
    <SheetsContext.Provider value={contextValue}>
      {children}
    </SheetsContext.Provider>
  );
};
