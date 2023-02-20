import Layout from "@/components/Layout";
import { SheetsContextProvider } from "@/context/SheetsContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";


export default function App({ Component, pageProps }: AppProps) {
  return (
    <SheetsContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SheetsContextProvider>
  );
}
