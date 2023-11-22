import { Banner, BannerGradient } from "@/components/Banner";
import { HeaderText } from "@/components/HeaderText";
import { TextHolder } from "@/components/TextHolder";
import { useSheetsContext } from "@/context/SheetsContext";
import React from "react";
import styled from "styled-components";
import { CardContainer, SchoolCard } from "./components/SchoolCard";
import SchoolMap from "./components/SchoolMap";

const Schools = () => {
  const { schoolsContext } = useSheetsContext();

  return (
    <>
      <Banner
        backgroundUrl={schoolsContext.bannerUrl}
        backgroundAttachment={"scroll"}
      />
      <TextHolder>
        <HeaderText>{schoolsContext.title}</HeaderText>

        <SchoolContainer>
          <div style={{ width: "80%" }}>
            <SchoolMap />
          </div>
        </SchoolContainer>
        <SchoolContainer>
          {schoolsContext.cards.map(
            ({ title, url, address, cityState, image, lat, long }, index) => {
              return (
                <SchoolCard
                  title={title}
                  url={url}
                  address={address}
                  cityState={cityState}
                  image={image}
                  lat={lat}
                  long={long}
                  key={index}
                />
              );
            }
          )}
        </SchoolContainer>
      </TextHolder>
    </>
  );
};

const SchoolContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  img {
    width: 150px;
    height: 100px;
    object-fit: contain;
  }

  > ${CardContainer} {
    flex: 1 1 30%;
    transition: 0.5s all;
  }
`;

export default Schools;
