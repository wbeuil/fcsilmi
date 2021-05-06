import { useState } from "react";
import Image from "next/image";
import Head from "next/head";
import useSWR from "swr";

import Button from "../components/Button";
import TeamCard from "../components/TeamCard";
import ShowmatchComposition from "../icons/showmatch-composition.svg";
import Forward from "../icons/forward.svg";
import Twitter from "../icons/twitter.svg";

const fetcher = (url) => fetch(url).then((r) => r.json());

const ShowmatchCard = ({ src, alt }) => (
  <div className="mx-2">
    <Image src={src} alt={alt} width={140} height={300} />
  </div>
);

const TWEET_TEXT =
  "J'affiche mon appartenance pour le #showmatch du FC Silmi vs Team Crouton ce Jeudi 6 Mai!";

const Showmatch = () => {
  const [team, setTeam] = useState("fcsilmi");
  const { data } = useSWR("/api/poll", fetcher, { refreshInterval: 5000 });
  const fcsilmi = data?.poll?.votes[0] || 0;
  const crouton = data?.poll?.votes[1] || 0;
  const total = fcsilmi + crouton;
  const permalink = encodeURIComponent(
    `https://fcsilmi.club/showmatch/${team}`
  );
  const text = encodeURIComponent(TWEET_TEXT);
  const tweetUrl = `https://twitter.com/intent/tweet?url=${permalink}&text=${text}`;

  return (
    <div>
      <Head>
        <title>Showmatch - FC Silmi vs Team Crouton</title>
        <meta
          name="description"
          content="Rendez-vous Jeudi 6 Mai à 21h pour un Showmatch entre le FC Silmi et la Team Crouton!"
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
          href="/fonts/DIN-Condensed.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <meta name="theme-color" content="#eeeeee" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fcsilmi.club/showmatch" />
        <meta
          property="og:title"
          content="Showmatch - FC Silmi vs Team Crouton"
        />
        <meta
          property="og:description"
          content="Rendez-vous Jeudi 6 Mai à 21h pour un Showmatch entre le FC Silmi et la Team Crouton!"
        />
        <meta
          property="og:image"
          content="https://fcsilmi.club/images/showmatch.jpeg"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="628" />
        <meta property="og:locale" content="fr_FR" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@wbeuil" />
      </Head>

      <div className="fixed z-50 top-8 right-8 md:right-15">
        <Button />
      </div>

      <main className="flex flex-col items-center">
        <div className="relative mb-8 md:mb-16">
          <div className="absolute z-10 top-0 left-0 w-full h-full overlay dark:overlay-dark" />
          <Image
            src="/images/showmatch.jpeg"
            alt="Showmatch FCSilmi vs TeamCrouton"
            width={1440}
            height={810}
          />
        </div>

        <div className="w-full md:w-auto my-8 md:my-16 px-4">
          <h1 className="font-bold text-2xl md:text-4xl text-center mb-4 md:mb-8">
            <a
              href="https://www.strawpoll.me/45221011"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-row items-center justify-center p-2 rounded focus:outline-none focus:ring focus:border-blue-300 hover:text-blue-400"
            >
              Qui va gagner ce showmatch ?
              <span aria-hidden className="ml-4">
                <Forward width={28} />
              </span>
            </a>
          </h1>

          <div className="flex flex-row items-center justify-center">
            <div className="flex flex-row items-center">
              <Image
                src="/images/fcsilmi.png"
                alt="FCSilmi"
                width={50}
                height={50}
              />
              <p className="text-lg md:text-3xl md:ml-2 w-9 md:w-12">
                {((fcsilmi / total) * 100).toFixed(0)}%
              </p>
            </div>

            <div className="flex flex-col items-center mx-2 md:mx-4">
              <div className="w-32 md:w-96 h-2.5 rounded border border-gray-200 flex flex-row overflow-hidden mt-8">
                <div
                  className="h-full"
                  style={{
                    width: `${(fcsilmi / total) * 100}%`,
                    backgroundColor: "#FBD078",
                  }}
                />
                <div
                  className="h-full"
                  style={{
                    width: `${(crouton / total) * 100}%`,
                    backgroundColor: "#DA3947",
                  }}
                />
              </div>
              <p className="text-md md:text-2xl mt-1">{total} Votes</p>
            </div>

            <div className="flex flex-row items-center">
              <p className="text-lg md:text-3xl text-right mr-2 md:mr-4 w-9 md:w-12">
                {((crouton / total) * 100).toFixed(0)}%
              </p>
              <Image
                src="/images/crouton.png"
                alt="TeamCrouton"
                width={38}
                height={38}
              />
            </div>
          </div>
        </div>

        <div className="w-full md:w-auto my-8 md:my-16 px-4">
          <h1 className="font-bold text-2xl md:text-4xl text-center mb-4 md:mb-8">
            Soutiens ton équipe jusqu'au bout !
          </h1>
          <TeamCard team={team} />
          <div className="flex flex-row justify-between mt-4">
            <div className="flex flex-row">
              <button
                className="w-12 mr-2 flex items-center justify-center rounded focus:outline-none focus:ring focus:border-blue-300"
                disabled={team === "fcsilmi"}
                onClick={() => setTeam("fcsilmi")}
                style={{ opacity: team === "fcsilmi" ? "0.2" : "1" }}
              >
                <Image
                  src="/images/fcsilmi.png"
                  alt="FCSilmi"
                  width={50}
                  height={50}
                />
              </button>
              <button
                className="w-12 flex items-center justify-center rounded focus:outline-none focus:ring focus:border-blue-300"
                disabled={team === "croutongs"}
                onClick={() => setTeam("croutongs")}
                style={{ opacity: team === "croutongs" ? "0.2" : "1" }}
              >
                <Image
                  src="/images/crouton.png"
                  alt="TeamCrouton"
                  width={34}
                  height={34}
                />
              </button>
            </div>
            <div className="flex flex-row">
              <a
                className="w-12 flex items-center justify-center rounded focus:outline-none focus:ring focus:border-blue-300"
                href={tweetUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Twitter width={34} />
              </a>
            </div>
          </div>
        </div>

        <div className="w-full my-8 md:my-16 px-4">
          <ShowmatchComposition
            className="m-auto"
            style={{ maxWidth: "850px" }}
            width="100%"
            height="100%"
          />
        </div>

        <div className="my-8 md:my-16">
          <h2 className="font-bold text-2xl md:text-4xl text-center mb-8">
            Composition FC Silmi
          </h2>

          <div className="overflow-x-auto">
            <div className="w-double md:w-full overflow-x-scroll flex flex-row mb-8">
              <ShowmatchCard src="/images/showmatch-ponpon.png" alt="Ponpon" />
              <ShowmatchCard
                src="/images/showmatch-rayou.png"
                alt="R. Desolaye"
              />
              <ShowmatchCard src="/images/showmatch-mv.png" alt="C. De Virus" />
              <ShowmatchCard
                src="/images/showmatch-domi.png"
                alt="Coach Bizot"
              />
              <ShowmatchCard
                src="/images/showmatch-xari.png"
                alt="L.A. Posée"
              />
              <ShowmatchCard
                src="/images/showmatch-jiji.png"
                alt="Jinedine Jidane"
              />
              <ShowmatchCard
                src="/images/showmatch-riv.png"
                alt="R. Kerboeuf"
              />
              <ShowmatchCard
                src="/images/showmatch-dfg.png"
                alt="R. Entorsowski"
              />
            </div>
          </div>

          <h2 className="font-bold text-2xl md:text-4xl text-center mb-8">
            Composition Crouton GS
          </h2>

          <div className="overflow-x-auto">
            <div className="w-double md:w-full overflow-x-scroll flex flex-row mb-8">
              <ShowmatchCard
                src="/images/showmatch-lebou.png"
                alt="J.P. Mumu"
              />
              <ShowmatchCard
                src="/images/showmatch-martin.png"
                alt="M. Terrier"
              />
              <ShowmatchCard src="/images/showmatch-val.png" alt="Valouzz" />
              <ShowmatchCard
                src="/images/showmatch-dobby.png"
                alt="M. Brienne"
              />
              <ShowmatchCard src="/images/showmatch-inox.png" alt="Wesley C." />
              <ShowmatchCard
                src="/images/showmatch-michou.png"
                alt="Miguel M."
              />
              <ShowmatchCard src="/images/showmatch-doc.png" alt="Jason D." />
              <ShowmatchCard
                src="/images/showmatch-romain.png"
                alt="Megacoolos"
              />
            </div>
          </div>
        </div>
      </main>

      <footer className="max-w-2xl mx-auto w-full pb-8 px-4 md:px-0">
        <hr className="w-full border-1 border-gray-300 mb-8" />
        <p className="text-gray-600 px-8 mb-4">
          * Direction Artistique du FC Silmi par l'équipe de Domingo.
        </p>
        <p className="text-gray-600 px-8 mb-4">
          ** Merci à tous ceux qui ont contribué de près ou de loin à cette
          page, notamment Sébastien Mortiers et Spooky_ElBosoh.
        </p>
        <div className="flex flex-row justify-center px-8">
          <a
            className="text-gray-600 mx-2 p-1 rounded focus:outline-none focus:ring focus:border-blue-300"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/wbeuil/fcsilmi"
          >
            GitHub
          </a>

          <a
            className="text-gray-600 mx-2 p-1 rounded focus:outline-none focus:ring focus:border-blue-300"
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
};

export default Showmatch;
