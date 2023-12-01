import React from "react";
import { FaLinkedin } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import { useMediaQuery } from "react-responsive";
import styles from "./Footer.module.css";

const Footer = () => {
  const isMobile = useMediaQuery({ maxWidth: 900 });
  return (
    <>
      <div className={styles.footer_container}>
        <div style={{ width: "100%" }}>
          <hr />
          <div className={styles.footer_separator}>
            <div
              style={{
                display: "flex",
                alignContent: "center",
                justifyItems: "end",
              }}
            >
              <p>&copy;{2023} Early Foundations. All Rights Reserved.</p>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <p>Privacy Policy | Terms</p>
              <span
                style={
                  isMobile
                    ? { display: "none" }
                    : { marginLeft: "10px", marginRight: "10px" }
                }
              >
                <a
                  href="https://www.linkedin.com/in/traysonkelii/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <IconContext.Provider
                    value={
                      isMobile
                        ? { color: "#203864", size: "10px" }
                        : { color: "#203864", size: "25px" }
                    }
                  >
                    <FaLinkedin onClick={() => {}} />
                  </IconContext.Provider>
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
