import { buildRangeBasePath } from "@/pages/api/sheets";
import { SchoolState } from "@/pages/schools/components/SchoolMap";
import { SchoolStateParser } from "@/services/SchoolStateParser";
import { SheetsParser } from "@/services/SheetsParser";
import {
  SheetsBioData,
  SheetsButton,
  SheetsJobLink,
  SheetsSchoolCardData,
} from "@/services/SheetsParser/models";

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
export interface ContactData extends Base {
  subHeaders: string[];
  button: SheetsButton;
}
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
export interface CareersData extends Base {
  subtext?: string;
  jobs?: SheetsJobLink[];
}
export interface DynamicTabs {
  [x: string]: ReactNode;
}

export interface SheetsContext {
  homeContext: HomeData;
  aboutContext: AboutData;
  schoolsContext: SchoolsData;
  approachContext: ApproachData;
  teamContext: TeamData;
  careersContext: CareersData;
  contactContext: ContactData;
  writeToForm: ({
    email,
    subject,
    message,
  }: {
    email: string;
    subject: string;
    message: string;
  }) => object;
  isLoading: boolean;
  tabs: DynamicTabs;
  privacyLink: string;
  termsLink: string;
}

const SheetsContext = createContext<SheetsContext>({
  homeContext: {},
  aboutContext: {},
  contactContext: {
    subHeaders: [],
    button: { displayValue: "" },
  },
  schoolsContext: { cards: [], schoolStates: [] },
  approachContext: {
    multiText: [],
    button: { displayValue: "" },
  },
  teamContext: { bios: [] },
  careersContext: { subtext: "", jobs: [] },
  writeToForm: () => [],
  isLoading: true,
  tabs: {},
  privacyLink: "",
  termsLink: "",
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
  const [contactData, setContactData] = useState<ContactData>({
    subHeaders: [],
    button: { displayValue: "" },
  });
  const [schoolData, setSchoolData] = useState<SchoolsData>({
    cards: [],
    schoolStates: [],
  });
  const [approachData, setApproachData] = useState<ApproachData>({
    multiText: [],
    button: { displayValue: "" },
  });
  const [teamData, setTeamData] = useState<TeamData>({ bios: [] });
  const [careersData, setCareersData] = useState<CareersData>({
    subtext: "",
    jobs: [],
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [tabs, setTabs] = useState({});
  const [privacyLink, setPrivacyLink] = useState("");
  const [termsLink, setTermsLink] = useState("");

  const wrtieToForm = async ({
    email,
    subject,
    message,
  }: {
    email: string;
    subject: string;
    message: string;
  }) => {
    const body = { email, subject, message };
    try {
      await fetch(`/api/sheets`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }).then((res) => {
        return res.json();
      });
    } catch (error) {
      throw new Error("Error with write: " + error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const homeCall = fetch(buildRangeBasePath("home!A1:Z60")).then((res) =>
      res.json()
    );
    const aboutCall = fetch(buildRangeBasePath("tab1!A1:Z60")).then((res) =>
      res.json()
    );
    const schoolCall = fetch(buildRangeBasePath("tab2!A1:Z60")).then((res) =>
      res.json()
    );
    const approachCall = fetch(buildRangeBasePath("tab3!A1:Z60")).then((res) =>
      res.json()
    );
    const teamCall = fetch(buildRangeBasePath("tab4!A1:Z60")).then((res) =>
      res.json()
    );
    const careersCall = fetch(buildRangeBasePath("tab5!A1:Z60")).then((res) =>
      res.json()
    );
    const contactCall = fetch(buildRangeBasePath("tab6!A1:Z60")).then((res) =>
      res.json()
    );

    Promise.all([
      homeCall,
      aboutCall,
      schoolCall,
      approachCall,
      teamCall,
      careersCall,
      contactCall,
    ]).then(
      ([
        homeRes,
        aboutRes,
        schoolRes,
        approachRes,
        teamRes,
        careersRes,
        contactRes,
      ]) => {
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
          button: approachContent.button || { displayValue: "default button" },
        });

        const teamContent = SheetsParser(teamRes);
        setTeamData({
          title: teamContent.title?.value,
          bannerUrl: teamContent.banner?.imgSource,
          bios: teamContent.bios ?? [],
        });

        const careersContent = SheetsParser(careersRes);
        setCareersData({
          title: careersContent.title?.value,
          bannerUrl: careersContent.banner?.imgSource,
          text: careersContent.text?.value,
          subtext: careersContent.subtext?.value,
          jobs: careersContent.jobs,
        });

        const contactContent = SheetsParser(contactRes);
        setContactData({
          title: contactContent.title?.value,
          bannerUrl: contactContent.banner?.imgSource,
          subHeaders: contactContent.subHeaders ?? [],
          text: contactContent.text?.value,
          button: contactContent.button || { displayValue: "default button" },
        });

        setTabs({
          tab1: aboutContent.tabName,
          tab2: schoolContent.tabName,
          tab3: approachContent.tabName,
          tab4: teamContent.tabName,
          tab5: careersContent.tabName,
          tab6: contactContent.tabName,
        });

        setPrivacyLink(homeContent.privacyPolicyLink ?? "");
        setTermsLink(homeContent.termsLink ?? "");

        setIsLoading(false);
      }
    );
  }, []);

  const contextValue: SheetsContext = {
    homeContext: homeData,
    aboutContext: aboutData,
    schoolsContext: schoolData,
    approachContext: approachData,
    teamContext: teamData,
    careersContext: careersData,
    contactContext: contactData,
    writeToForm: wrtieToForm,
    isLoading,
    tabs,
    termsLink,
    privacyLink,
  };

  return (
    <SheetsContext.Provider value={contextValue}>
      {children}
    </SheetsContext.Provider>
  );
};
