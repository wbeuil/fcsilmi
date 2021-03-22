import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs";
import Head from "next/head";
import Image from "next/image";
import { promises as fs } from "fs";
import path from "path";

import Info from "../components/Info";
import Stats from "../components/Stats";
import Matchs from "../components/Matchs";

import "@reach/tabs/styles.css";

export default function Home({ matchs, players }) {
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
        <meta property="og:image:height" content="628" />
        <meta property="og:locale" content="fr_FR" />
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
              <Stats players={players} />
            </TabPanel>
            <TabPanel>
              <Matchs matchs={matchs} players={players} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </main>

      <footer className="max-w-2xl mx-auto w-full pb-8 px-4 md:px-0">
        <hr className="w-full border-1 border-gray-300 mb-8" />
        <p className="text-gray-600 px-8 mb-4">
          *Toutes les statistiques des joueurs et des matchs sont calculées sur
          les données recueillis du site EA Sports. Ici nous n'avons pu en
          recueillir que pour 50 matchs sur les 71.
        </p>
        <p className="text-gray-600 px-8 mb-4">
          **Logo du FC Silmi par @FcSilmi sur Twitter.
        </p>
        <div className="flex flex-row justify-center px-8">
          <a
            className="text-gray-600 mx-2"
            target="_blank"
            rel="noopener noreferrer"
            href="https://twitter.com/fcsilmi"
          >
            Twitter
          </a>

          <a
            className="text-gray-600 mx-2"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/wbeuil/fcsilmi"
          >
            GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}

export async function getStaticProps() {
  const dataDirectory = path.join(process.cwd(), "data");
  const matchsPath = path.join(dataDirectory, "matchs.json");
  const matchs = await fs.readFile(matchsPath, "utf8");
  const playersPath = path.join(dataDirectory, "players.json");
  const players = await fs.readFile(playersPath, "utf8");

  return {
    props: {
      matchs: JSON.parse(matchs),
      players: JSON.parse(players),
    },
  };
}
