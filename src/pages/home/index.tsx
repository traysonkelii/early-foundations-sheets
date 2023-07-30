import { Banner, BannerGradient } from "@/components/Banner";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import Image from "next/image";
import logo from "../../../public/images/early.svg";
import primrose from "../../../public/images/primrose.svg";
import { useSheetsContext } from "@/context/SheetsContext";
import { useMediaQuery } from "react-responsive";
import { Loader } from "@/components/Loader";

const Home = () => {
  const isMobile = useMediaQuery({ maxWidth: 900 });
  const { homeContext, isLoading } = useSheetsContext();
  const mainText = homeContext.text ?? "";

  return (
    <>
      <>
        <Banner
          backgroundUrl={homeContext.bannerUrl}
          height={"500px"}
          gradient={BannerGradient.toVeryLight}
        >
          <Image src={logo} alt={"SVG logo"} width={400} height={400} />
        </Banner>
        <HomeTextHolder>
          <div style={{ margin: "2%", marginTop: "40px" }}>
            <Link href="https://www.primroseschools.com/" target="_blank">
              <Image src={primrose} height={200} width={200} alt={""} />
            </Link>
          </div>

          <div style={{ textAlign: "justify" }}>
            <p dangerouslySetInnerHTML={{ __html: mainText }} />
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
          <div style={{ textAlign: "center", marginTop: "3%" }}>
            <button>
              <a
                target={"_blank"}
                href="https://www.primroseschools.com/"
                rel={"noopener noreferrer"}
              >
                More about Primrose Schools
              </a>
            </button>
          </div>
        </HomeTextHolder>
      </>
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
  color: #667517;
  background-color: white;
  border: 2px solid #667517;
  padding-left: 3em;
  padding-right: 3em;
  transition: all 0.5s;
  font-family: "Genrock-Regular", Helvetica;
  font-size: large;
  &:hover {
    color: white;
    background-color: #667517;
    cursor: pointer;
  }
`;

export default Home;
