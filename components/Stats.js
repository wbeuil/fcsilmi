import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Dialog } from "@reach/dialog";

import { RowBilan } from "./Info";
import TwitchIcon from "../icons/twitch.svg";

import "@reach/dialog/styles.css";

const Player = ({ data, name = "IA", top, left }) => {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <button
        onClick={() => name !== "IA" && setShowDialog(true)}
        className="absolute rounded-full overflow-hidden border border-gray-200 focus:outline-none focus:ring focus:border-blue-300"
        style={{
          width: "50px",
          height: "50px",
          top,
          left,
          marginLeft: "-25px",
          marginTop: "-25px",
        }}
      >
        {name === "IA" ? (
          <div
            className="bg-gray-400 text-white flex justify-center items-center"
            style={{ width: "50px", height: "50px" }}
          >
            IA
          </div>
        ) : (
          <Image src={data.image} alt={name} width={50} height={50} />
        )}
      </button>

      {name !== "IA" && (
        <Dialog
          isOpen={showDialog}
          onDismiss={() => setShowDialog(false)}
          className="relative md:rounded-xl overflow-hidden"
          aria-label="Pop-up Statistique"
        >
          <div
            className="w-full absolute top-0 left-0 overflow-hidden"
            style={{ height: "250px" }}
          >
            <div
              className="bg-cover bg-center w-full h-full absolute top-0 left-0"
              style={{
                backgroundImage: "url(/images/fcsilmi.jpg)",
                filter: "blur(8px)",
                transform: "scale(1.1)",
              }}
            />

            <div className="w-full flex flex-row items-end absolute bottom-0 left-0 px-4 md:px-8">
              <div
                className="contents"
                style={{ width: "200px", height: "200px" }}
              >
                <Image src={data.cover} alt={name} width={200} height={200} />
              </div>

              <div className="flex flex-col ml-3 md:ml-6 mb-3 md:mb-6">
                <h3 className="text-3xl text-white mb-4">{data.name}</h3>

                <a
                  className="focus:outline-none"
                  style={{ color: "#772ce8", width: "fit-content" }}
                  target="_blank"
                  rel="noopener noreferrer"
                  href={data.twitch}
                >
                  <TwitchIcon width={30} />
                </a>
              </div>
            </div>
          </div>

          <button
            className="absolute text-3xl text-white top-2 right-2 px-3 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            onClick={() => setShowDialog(false)}
          >
            <span className="sr-only">Close</span>
            <span aria-hidden>×</span>
          </button>

          <div style={{ paddingTop: "250px" }}>
            <h2 className="text-xl uppercase mb-2">Bilan général</h2>

            <RowBilan name="Note moyenne" value={data.rating} />
            <RowBilan name="Matchs joués" value={data.gamesPlayed} />
            <RowBilan name="Buts" value={data.goals} />
            <RowBilan name="Passes" value={data.passesmade} />
            <RowBilan name="Tacles" value={data.tacklesmade} />
            <RowBilan name="Homme du match" value={data.mom} />
            <RowBilan name="Cartons rouge" value={data.redcards} />
          </div>
        </Dialog>
      )}
    </>
  );
};

const Stats = ({ players }) => {
  return (
    <div className="w-full relative mx-auto my-8" style={{ maxWidth: "450px" }}>
      <svg
        className="rounded-xl mb-16"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 556 832"
        width="100%"
        style={{
          maxWidth: "450px",
          background: "#6db543",
          backgroundImage: "url(/images/background.png)",
          backgroundSize: "contain",
        }}
      >
        <g
          className="stroke-current text-white stroke-2"
          transform="translate(540 16) rotate(90)"
          style={{ fill: "none" }}
        >
          <g>
            <rect y="0" x="0" width="800" height="524" />
            <line x1="400" y1="524" x2="400" y2="0" />
            <circle cx="400" cy="262" r="69.71677559912854" />
            <circle className="fill-current" cx="92" cy="262" r="2" />
            <circle className="fill-current" cx="708" cy="262" r="2" />
            <path d="M0,413.43600000000004L136,413.43600000000004L136,110.56399999999996L0,110.56399999999996" />
            <path d="M800,413.43600000000004L664,413.43600000000004L664,110.56399999999996L800,110.56399999999996" />
            <path d="M0,331.168L46.4,331.168L46.4,192.832L0,192.832" />
            <path d="M800,331.168L753.6,331.168L753.6,192.832L800,192.832" />
          </g>
        </g>
      </svg>

      <Player data={players["Ponce"]} name="Ponce" top="95%" left="50%" />
      <Player data={players["Rivenzi"]} name="Rivenzi" top="75%" left="20%" />
      <Player top="80%" left="40%" />
      <Player top="80%" left="60%" />
      <Player top="75%" left="80%" />
      <Player data={players["MisterMV"]} name="MisterMV" top="55%" left="50%" />
      <Player data={players["Domingo"]} name="Domingo" top="45%" left="35%" />
      <Player data={players["Xari"]} name="Xari" top="45%" left="65%" />
      <Player data={players["Etoiles"]} name="Etoiles" top="25%" left="25%" />
      <Player data={players["Jiraya"]} name="Jiraya" top="25%" left="75%" />
      <Player data={players["DFG"]} name="DFG" top="15%" left="50%" />
    </div>
  );
};

export default Stats;
