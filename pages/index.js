import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs";
import Head from "next/head";
import Image from "next/image";

import Info from "../components/Info";
import Stats from "../components/Stats";
import Matchs from "../components/Matchs";

import "@reach/tabs/styles.css";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Site du FC Silmi</title>
        <meta
          name="description"
          content="Club FIFA PRO avec vos streamers préférés ! | Chaque Lundi 20h30 sur Twitch | Rediffs dispos sur Youtube"
        />
        <link rel="icon" type="image/svg+xml" href="/images/favicon.svg" />
        <link rel="alternate icon" href="/images/favicon.ico" />
        <link
          rel="mask-icon"
          href="/images/safari-pinned-tab.svg"
          color="#eeeeee"
        />
        <link
          rel="preload"
          href="/fonts/DIN-Condensed.ttf"
          as="font"
          crossOrigin=""
        />
        <meta name="theme-color" content="#eeeeee" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fcsilmi.club/" />
        <meta property="og:title" content="Site du FC Silmi" />
        <meta
          property="og:description"
          content="Club FIFA PRO avec vos streamers préférés ! | Chaque Lundi 20h30 sur Twitch | Rediffs dispos sur Youtube"
        />
        <meta
          property="og:image"
          content="https://fcsilmi.club/images/preview.png"
        />
        <meta property="og:image:width" content="1200" />
      </Head>

      <main className="flex flex-col justify-center items-center">
        <div className="flex flex-col items-center p-8 my-8">
          <div
            className="rounded-full overflow-hidden border-2 border-white border-solid shadow-2xl mb-8"
            style={{ width: "120px", height: "120px" }}
          >
            <Image
              src="/images/fcsilmi.jpg"
              alt="Logo du FC Silmi"
              width={120}
              height={120}
            />
          </div>
          <h1 className="text-6xl font-bold italic">FC SILMI</h1>
        </div>

        <Tabs>
          <TabList>
            <Tab>INFO</Tab>
            <Tab>STATS</Tab>
            <Tab>MATCHS</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Info />
            </TabPanel>
            <TabPanel>
              <Stats />
            </TabPanel>
            <TabPanel>
              <Matchs />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </main>
    </div>
  );
}
