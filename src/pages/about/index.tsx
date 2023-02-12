import { Banner, BannerGradient } from "@/components/Banner";
import { HeaderText } from "@/components/HeaderText";
import { TextHolder } from "@/components/TextHolder";
import { useSheetsContext } from "@/context/SheetsContext";
import React from "react";

const about = () => {
  const { aboutContext } = useSheetsContext();

  return (
    <>
      <Banner
        backgroundUrl={aboutContext.bannerUrl}
        gradient={BannerGradient.toLight}
      />
      <TextHolder>
        <HeaderText>{aboutContext.title}</HeaderText>
        <div style={{ textAlign: "left" }}>{aboutContext.text}</div>
      </TextHolder>
    </>
  );
};

export default about;
