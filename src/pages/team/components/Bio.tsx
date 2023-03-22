import { SheetsBioData } from "@/services/SheetsParser/models";
import React from "react";

export const Bio = ({ name, title, desc }: SheetsBioData) => {
  return (
    <div style={{ textAlign: "left", marginTop: "50px" }}>
      {/* <p style={{ lineHeight: 1.5 }}>
        <strong>{name}</strong> <br /> <i>{title}</i>
      </p>
      {desc.map((text, index) => (
        <p dangerouslySetInnerHTML={{ __html: text }} key={index} />
      ))}
      <hr /> */}
    </div>
  );
};

export default Bio;
