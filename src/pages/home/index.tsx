import { Banner, BannerGradient } from "@/components/Banner";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import logo from "../../../public/images/early.svg";
import { SheetsTextParser } from "@/services/SheetsParser/SheetsTextParser";
import { SheetsBannerParser } from "@/services/SheetsParser/SheetsBannerParser";
import { useSheetsContext } from "@/context/SheetsContext";
import { useMediaQuery } from "react-responsive";

const Home = () => {
  const isMobile = useMediaQuery({ maxWidth: 900 });
  const { homeContext } = useSheetsContext();

  return (
    <>
      <Banner
        backgroundUrl={homeContext.bannerUrl}
        height={"500px"}
        gradient={BannerGradient.toVeryLight}
      >
        <Image src={logo} alt={"SVG logo"} width={400} height={400} />
      </Banner>
      <HomeTextHolder>
        <div style={{ textAlign: "justify" }}>
          <p>{homeContext.text}</p>
        </div>
        <Link href="/about">
          <HomeButton
            onClick={() => window.scrollTo(0, 0)}
            style={{ marginTop: "10%" }}
          >
            <p
              style={
                isMobile
                  ? { margin: 0, padding: 0, fontSize: "small" }
                  : { margin: 0, padding: 0, fontSize: "large" }
              }
            >
              Learn More
            </p>
          </HomeButton>
        </Link>
      </HomeTextHolder>
    </>
  );
};

const HomeTextHolder = styled.div`
  margin-right: 20%;
  margin-left: 20%;
  margin-bottom: 10%;
  line-height: 2;
  font-size: large;
  text-align: center;
`;

const HomeButton = styled.button`
  color: #8cc640;
  background-color: white;
  border: 2px solid #8cc640;
  padding-left: 3em;
  padding-right: 3em;
  transition: all 0.5s;
  font-family: "Genrock-Regular", Helvetica;
  font-size: large;
  &:hover {
    color: white;
    background-color: #8cc640;
    cursor: pointer;
  }
`;

export default Home;
