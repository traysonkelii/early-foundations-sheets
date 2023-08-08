import { ReactNode } from "react";
import Footer from "../Footer";
import Navbar from "../Navbar";
import { useSheetsContext } from "@/context/SheetsContext";
import { Loader } from "../Loader";

interface Props {
  children?: ReactNode;
}

export default function Layout({ children }: Props) {
  const { isLoading } = useSheetsContext();

  return (
    <>
      {isLoading ? (
        <div style={{ textAlign: "center", marginTop: "5%" }}>
          <Loader />
        </div>
      ) : (
        <>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </>
      )}
    </>
  );
}
