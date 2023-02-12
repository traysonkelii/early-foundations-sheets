import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/images/early.svg";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <header className={styles.navbar}>
      <div className={styles.navbar__title}>
        <Link href="/home">
        <Image src={logo} alt={"SVG logo"} width={80} height={80} />
        </Link>
      </div>
      <Link href="/home" style={{ textDecoration: "none" }}>
        <div className={styles.navbar__item}>
          <p>Home</p>
        </div>
      </Link>
      <Link href="/about" style={{ textDecoration: "none" }}>
        <div className={styles.navbar__item}>
          <p>About</p>
        </div>
      </Link>
      <Link href="/schools" style={{ textDecoration: "none" }}>
        <div className={styles.navbar__item}>
          <p>Our Schools</p>
        </div>
      </Link>
    </header>
  );
};

export default Navbar;
