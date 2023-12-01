import { ReactNode } from "react";
import styled from "styled-components";

export enum BannerGradient {
  toVeryDark = "toVeryDark",
  toDark = "toDark",
  toLight = "toLight",
  toVeryLight = "toVeryLight",
  none = "none",
}

export interface BannerProps {
  backgroundUrl?: string;
  height?: string;
  gradient?: BannerGradient;
  children?: ReactNode;
  backgroundAttachment?: string;
  backgroundSize?: string;
}

export const Banner = ({
  backgroundUrl,
  height = "500px",
  gradient = BannerGradient.none,
  children,
  backgroundAttachment = "fixed",
  backgroundSize = "cover",
}: BannerProps) => {
  const { gradientStart, gradientEnd, gradientColor } = getGradient(gradient);

  return (
    <>
      <BannerImage
        url={backgroundUrl}
        height={height}
        gradientStart={gradientStart}
        gradientEnd={gradientEnd}
        gradientColor={gradientColor}
        backgroundAttachment={backgroundAttachment}
        backgroundSize={backgroundSize}
      >
        {children}
      </BannerImage>
    </>
  );
};

interface BannerImageProps {
  url?: string;
  height: string;
  gradientStart: number;
  gradientEnd: number;
  gradientColor: number;
  backgroundAttachment: string;
  backgroundSize: string;
}

const BannerImage = styled.div<BannerImageProps>`
  width: 100%;
  height: ${(props) => props.height};
  background-position: center;
  background-image: linear-gradient(
      to top,
      ${(props) =>
        `rgba(${props.gradientColor}, ${props.gradientColor}, ${props.gradientColor}, ${props.gradientStart}), rgba(${props.gradientColor}, ${props.gradientColor}, ${props.gradientColor}, ${props.gradientEnd})`}
    ),
    url(${(props) => props.url});
  align-items: center;
  display: flex;
  justify-content: center;
  text-align: center;
  background-attachment: ${(props) => props.backgroundAttachment};
  background-size: ${(props) => props.backgroundSize};
  background-repeat: no-repeat;
  @media all and (max-width: 900px) {
    height: 200px;
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: scroll;
  }
`;

const getGradient = (bannerGradient: BannerGradient) => {
  let gradientStart, gradientEnd, gradientColor;

  switch (bannerGradient) {
    case BannerGradient.toVeryDark:
      gradientStart = 0.8;
      gradientEnd = 1;
      gradientColor = 0;
      break;
    case BannerGradient.toDark:
      gradientStart = 0;
      gradientEnd = 1;
      gradientColor = 0;
      break;
    case BannerGradient.toLight:
      gradientStart = 1;
      gradientEnd = 0;
      gradientColor = 255;
      break;
    case BannerGradient.toVeryLight:
      gradientStart = 0.8;
      gradientEnd = 1;
      gradientColor = 255;
      break;
    default:
      gradientStart = 0;
      gradientEnd = 0;
      gradientColor = 0;
      break;
  }

  return { gradientStart, gradientEnd, gradientColor };
};
