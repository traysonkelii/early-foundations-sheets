import { Banner, BannerGradient } from "@/components/Banner";
import { HeaderText } from "@/components/HeaderText";
import { TextHolder } from "@/components/TextHolder";
import { useSheetsContext } from "@/context/SheetsContext";
import React from "react";

const team = () => {
  const { teamContext } = useSheetsContext();

  return (
    <>
      <Banner
        backgroundUrl={teamContext.bannerUrl}
        gradient={BannerGradient.toLight}
      />
      <TextHolder>
        <HeaderText>{teamContext.title}</HeaderText>
      </TextHolder>
    </>
  );
};

export default team;
