import "@/styles/globals.css";
import "../styles/landingPage.css";
import "../styles/Login.css"

import { Prata, Work_Sans } from "next/font/google";
import type { AppProps } from "next/app";

const prata = Prata({
  weight: "400",
  variable: "--font-prata",
  subsets: ["latin"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${prata.variable} ${workSans.variable} font-sans`}>
      <Component {...pageProps} />
    </main>
  );
}
