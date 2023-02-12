import { SheetsBannerParser } from "@/services/SheetsParser/SheetsBannerParser";
import { SheetsTextParser } from "@/services/SheetsParser/SheetsTextParser";
import { SheetsTitleParser } from "@/services/SheetsParser/SheetsTitleParser";
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

export interface SheetsContext {
  homeContext: HomeData;
  setHomeContext: (homeData: HomeData) => void;

  aboutContext: AboutData;
  setAboutContext: (aboutData: AboutData) => void;
}

const SheetsContext = createContext<SheetsContext>({
  homeContext: { bannerUrl: "" },
  setHomeContext: () => {},
  aboutContext: { bannerUrl: "" },
  setAboutContext: () => {},
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

  useEffect(() => {
    const homeCall = fetch("/api/getHome").then((res) => res.json());
    const aboutCall = fetch("/api/getAbout").then((res) => res.json());

    Promise.all([homeCall, aboutCall]).then(([homeRes, aboutRes]) => {
      const homeText = SheetsTextParser(homeRes.data[1]).text;
      const homeBannerUrl = SheetsBannerParser(homeRes.data[3]).bannerUrl;
      setHomeData({ text: homeText, bannerUrl: homeBannerUrl });

      const aboutText = SheetsTextParser(aboutRes.data[1]).text;
      const aboutBannerUrl = SheetsBannerParser(aboutRes.data[3]).bannerUrl;
      const aboutTitleText = SheetsTitleParser(aboutRes.data[5]).titleText;
      setAboutData({
        text: aboutText,
        bannerUrl: aboutBannerUrl,
        title: aboutTitleText,
      });
    });
  }, []);

  const contextValue: SheetsContext = {
    homeContext: homeData,
    setHomeContext: setHomeData,
    aboutContext: aboutData,
    setAboutContext: setAboutData,
  };

  return (
    <SheetsContext.Provider value={contextValue}>
      {children}
    </SheetsContext.Provider>
  );
};
