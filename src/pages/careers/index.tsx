import { Banner, BannerGradient } from "@/components/Banner";
import { HeaderText } from "@/components/HeaderText";
import { TextHolder } from "@/components/TextHolder";
import { useSheetsContext } from "@/context/SheetsContext";

const Careers = () => {
  const { careersContext } = useSheetsContext();

  return (
    <>
      <Banner backgroundUrl={careersContext.bannerUrl} />
      <TextHolder>
        <HeaderText>{careersContext.title}</HeaderText>
        <div style={{ textAlign: "left" }}>
          {careersContext.text}
          <p>{careersContext.subtext}</p>

          <ul>
            {careersContext.jobs?.map((job, index) => (
              <li key={index}>
                <i>
                  <a
                    target={"_blank"}
                    rel={"noopener noreferrer"}
                    style={{ textDecoration: "underline" }}
                    href={job.link}
                  >
                    {job.title}
                  </a>
                </i>
              </li>
            ))}
          </ul>
        </div>
      </TextHolder>
    </>
  );
};

export default Careers;
