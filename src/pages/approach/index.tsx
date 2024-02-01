import { Banner, BannerGradient } from "@/components/Banner";
import { HeaderText } from "@/components/HeaderText";
import { TextHolder } from "@/components/TextHolder";
import { useSheetsContext } from "@/context/SheetsContext";
import React from "react";

const Approach = () => {
  const { approachContext } = useSheetsContext();
  const multiText = approachContext.multiText;
  const button = approachContext.button;
  const buttonUrl = button.link ?? "";

  return (
    <>
      <Banner
        backgroundUrl={approachContext.bannerUrl}
        backgroundAttachment="scroll"
        backgroundSize="contain"
      />
      <TextHolder>
        <HeaderText>{approachContext.title}</HeaderText>
        <div style={{ textAlign: "left" }}>
          {multiText &&
            multiText.map((text, index) => (
              <p key={index} dangerouslySetInnerHTML={{ __html: text }} />
            ))}
        </div>
        <button>
          <a
            target={"_blank"}
            href={buttonUrl}
            rel={"noopener noreferrer"}
            dangerouslySetInnerHTML={{ __html: button.displayValue }}
          />
        </button>
      </TextHolder>
    </>
  );
};

export default Approach;
