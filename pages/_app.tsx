import "@/styles/globals.css";
import "../styles/landingPage.css";
import "../styles/Login.css"
import "../styles/info.css"

import { Prata, Work_Sans } from "next/font/google";
import type { AppProps } from "next/app";
import React from 'react';
import axios from 'axios';

import { Providers } from "@/redux/provider";


axios.defaults.withCredentials = true;

axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

const prata = Prata({
  weight: "400",
  variable: "--font-prata",
  subsets: ["latin"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
});

function App({ Component,  pageProps }: AppProps) {

  return (
      <main className={`${prata.variable} ${workSans.variable} font-sans`}>
        <Providers>
          <Component {...pageProps} />
        </Providers>
      </main>

  );
}

export default App