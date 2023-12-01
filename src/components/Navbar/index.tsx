import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/images/early.svg";
import styles from "./Navbar.module.css";
import { useMediaQuery } from "react-responsive";
import { useState } from "react";
import Burger from "../Burger";
import { useSheetsContext } from "@/context/SheetsContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 900 });
  const handleMobileClick = () => {
    setOpen(false);
    window.scrollTo(0, 0);
  };
  const { tabs } = useSheetsContext();

  return (
    <header className={styles.navbar}>
      <div className={styles.navbar__title}>
        <Link href="/home">
          <Image src={logo} alt={"SVG logo"} width={80} height={80} />
        </Link>
      </div>
      {!isMobile && (
        <Link href="/about" style={{ textDecoration: "none" }}>
          <div className={styles.navbar__item}>
            <p>{tabs.tab1}</p>
          </div>
        </Link>
      )}
      {!isMobile && (
        <Link href="/schools" style={{ textDecoration: "none" }}>
          <div className={styles.navbar__item}>
            <p>{tabs.tab2}</p>
          </div>
        </Link>
      )}
      {!isMobile && (
        <Link href="/approach" style={{ textDecoration: "none" }}>
          <div className={styles.navbar__item}>
            <p>{tabs.tab3}</p>
          </div>
        </Link>
      )}
      {!isMobile && (
        <Link href="/team" style={{ textDecoration: "none" }}>
          <div className={styles.navbar__item}>
            <p>{tabs.tab4}</p>
          </div>
        </Link>
      )}
      {!isMobile && (
        <Link href="/careers" style={{ textDecoration: "none" }}>
          <div className={styles.navbar__item}>
            <p>{tabs.tab5}</p>
          </div>
        </Link>
      )}
      {!isMobile && (
        <Link href="/contact" style={{ textDecoration: "none" }}>
          <div className={styles.navbar__item}>
            <p>{tabs.tab6}</p>
          </div>
        </Link>
      )}

      <div className={styles.navbar__mobile}>
        <div>
          <Link href="/home" onClick={() => handleMobileClick()}>
            <Image src={logo} alt={"SVG logo"} height={50} width={50} />
          </Link>
        </div>

        <div style={{ margin: "5px" }}>
          <Burger open={open} setOpen={setOpen} />
        </div>
      </div>
      {isMobile && open && (
        <div>
          <Link
            href="/about"
            style={{ textDecoration: "none" }}
            onClick={() => handleMobileClick()}
          >
            <div className={styles.navbar__item}>
              <p>{tabs.tab1}</p>
            </div>
          </Link>
          <Link
            href="/schools"
            style={{ textDecoration: "none" }}
            onClick={() => handleMobileClick()}
          >
            <div className={styles.navbar__item}>
              <p>{tabs.tab2}</p>
            </div>
          </Link>
          <Link
            href="/approach"
            style={{ textDecoration: "none" }}
            onClick={() => handleMobileClick()}
          >
            <div className={styles.navbar__item}>
              <p>{tabs.tab3}</p>
            </div>
          </Link>
          <Link
            href="/team"
            style={{ textDecoration: "none" }}
            onClick={() => handleMobileClick()}
          >
            <div className={styles.navbar__item}>
              <p>{tabs.tab4}</p>
            </div>
          </Link>
          <Link
            href="/careers"
            style={{ textDecoration: "none" }}
            onClick={() => handleMobileClick()}
          >
            <div className={styles.navbar__item}>
              <p>{tabs.tab5}</p>
            </div>
          </Link>
          <Link
            href="/contact"
            style={{ textDecoration: "none" }}
            onClick={() => handleMobileClick()}
          >
            <div className={styles.navbar__item}>
              <p>{tabs.tab6}</p>
            </div>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
