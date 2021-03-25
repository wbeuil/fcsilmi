import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs";
import Head from "next/head";
import Image from "next/image";

import { promises as fs } from "fs";
import path from "path";

import Button from "../components/Button";
import Info from "../components/Info";
import Stats from "../components/Stats";
import Matchs from "../components/Matchs";

import "@reach/tabs/styles.css";

export default function Home({ maxMatchsPages, matchs, players, info }) {
  return (
    <div>
      <Head>
        <title>Site du FC Silmi</title>
        <meta
          name="description"
          content="Club FIFA PRO avec vos streamers préférés ! | Chaque Lundi 20h30 sur Twitch | Rediffs dispos sur Youtube"
        />
        <link rel="icon" type="image/svg+xml" href="/images/favicon.svg" />
        <link rel="alternate icon" href="/favicon.ico" />
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
          <div className="flex flex-row items-center mb-8">
            <TabList>
              <Tab>INFO</Tab>
              <Tab>STATS</Tab>
              <Tab>MATCHS</Tab>
            </TabList>
            <Button />
          </div>
          <TabPanels>
            <TabPanel>
              <Info info={info} />
            </TabPanel>
            <TabPanel>
              <Stats players={players} />
            </TabPanel>
            <TabPanel>
              <Matchs
                maxMatchsPages={maxMatchsPages}
                matchs={matchs}
                players={players}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </main>

      <footer className="max-w-2xl mx-auto w-full pb-8 px-4 md:px-0">
        <hr className="w-full border-1 border-gray-300 mb-8" />
        <p className="text-gray-600 px-8 mb-4">
          *Toutes les statistiques des joueurs et des matchs sont calculées sur
          les données recueillis du site EA Sports. Ici nous n'avons pas pu
          recueillir les données de 20 matchs.
        </p>
        <p className="text-gray-600 px-8 mb-4">
          **Logo du FC Silmi par Sébastien Mortiers.
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

          <a
            className="text-gray-600 mx-2"
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.twitch.tv/wbeuil"
          >
            William Beuil
          </a>
        </div>
      </footer>
    </div>
  );
}

export async function getStaticProps() {
  const dataDirectory = path.join(process.cwd(), "data");
  const matchsPath = path.join(dataDirectory, "matchs");
  const matchs = await fs.readFile(`${matchsPath}/0.json`, "utf8");
  const matchsPages = await fs.readdir(matchsPath);
  const playersPath = path.join(dataDirectory, "players.json");
  const players = await fs.readFile(playersPath, "utf8");
  const infoPath = path.join(dataDirectory, "info.json");
  const info = await fs.readFile(infoPath, "utf8");

  return {
    props: {
      maxMatchsPages: matchsPages.length,
      matchs: JSON.parse(matchs),
      players: JSON.parse(players),
      info: JSON.parse(info),
    },
  };
}
