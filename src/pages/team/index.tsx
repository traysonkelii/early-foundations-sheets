import { Banner, BannerGradient } from "@/components/Banner";
import { HeaderText } from "@/components/HeaderText";
import { TextHolder } from "@/components/TextHolder";
import { useSheetsContext } from "@/context/SheetsContext";
import React from "react";
import styled from "styled-components";

const TeamMemeberContainer = styled.div`
  text-align: left;
  margin-top: "50px";
`;

const TeamMemberHeader = styled.p`
  line-height: 1.5;
`;

const TeamMember = ({
  name,
  role,
  descArray,
}: {
  name: string;
  role: string;
  descArray: string[];
}) => {
  return (
    <TeamMemeberContainer>
      <TeamMemberHeader>
        <strong>{name}</strong> <br /> <i>{role}</i>
      </TeamMemberHeader>
      {descArray.map((para, index) => (
        <p key={index}>{para}</p>
      ))}
      <hr />
    </TeamMemeberContainer>
  );
};

const Team = () => {
  const { teamContext } = useSheetsContext();
  return (
    <>
      <Banner
        backgroundUrl={teamContext.bannerUrl}
        gradient={BannerGradient.toLight}
        backgroundSize={"contain"}
      />
      <TextHolder>
        <HeaderText>{teamContext.title}</HeaderText>
        {teamContext.bios.map((person, index) => (
          <TeamMember
            name={person.name}
            role={person.title}
            descArray={person.desc}
            key={index}
          />
        ))}
      </TextHolder>
    </>
  );
};

export default Team;
