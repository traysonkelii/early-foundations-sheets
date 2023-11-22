import { Banner, BannerGradient } from "@/components/Banner";
import { HeaderText } from "@/components/HeaderText";
import { TextHolder } from "@/components/TextHolder";
import { useSheetsContext } from "@/context/SheetsContext";
import React from "react";

const About = () => {
  const { aboutContext } = useSheetsContext();

  return (
    <>
      <Banner backgroundUrl={aboutContext.bannerUrl} />
      <TextHolder>
        <HeaderText>{aboutContext.title}</HeaderText>
        <div style={{ textAlign: "left" }}>{aboutContext.text}</div>
      </TextHolder>
    </>
  );
};

export default About;
