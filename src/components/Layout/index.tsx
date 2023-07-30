import { ReactNode } from "react";
import Footer from "../Footer";
import Navbar from "../Navbar";
import { useSheetsContext } from "@/context/SheetsContext";
import { Loader } from "../Loader";

interface Props {
  children?: ReactNode;
}

export default function Layout({ children }: Props) {
  const { homeContext, isLoading } = useSheetsContext();

  return (
    <>
      <Navbar />
      {isLoading ? (
        <div style={{ textAlign: "center" }}>
          <Loader />
        </div>
      ) : (
        <main>{children}</main>
      )}
      <Footer />
    </>
  );
}
