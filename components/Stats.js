import { useState } from "react";
import Image from "next/image";
import { DialogContent, DialogOverlay } from "@reach/dialog";
import { Listbox, ListboxOption } from "@reach/listbox";

import { RowBilan } from "./Info";
import TwitchIcon from "../icons/twitch.svg";

import "@reach/dialog/styles.css";
import "@reach/listbox/styles.css";

const Player = ({ data, name = "IA", top, left }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [value, setValue] = useState("total");

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
        <DialogOverlay
          isOpen={showDialog}
          onDismiss={() => setShowDialog(false)}
          dangerouslyBypassFocusLock={true}
        >
          <DialogContent
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
              <div className="flex flex-row items-center mb-2">
                <h2 className="text-xl uppercase">Bilan</h2>
                <Listbox defaultValue="total" value={value} onChange={setValue}>
                  <ListboxOption value="total">Total</ListboxOption>
                  {Object.keys(data.sessions).map((opt, i) => (
                    <ListboxOption key={i} value={opt}>
                      {opt}*
                    </ListboxOption>
                  ))}
                </Listbox>
              </div>
              <RowBilan
                name="Note moyenne"
                value={
                  value === "total" ? data.rating : data.sessions[value].rating
                }
              />
              <RowBilan
                name="Matchs joués"
                value={
                  value === "total"
                    ? data.gamesPlayed
                    : data.sessions[value].gamesPlayed
                }
              />
              <RowBilan
                name="Buts"
                value={
                  value === "total" ? data.goals : data.sessions[value].goals
                }
              />
              {name !== "Ponce" && (
                <>
                  <RowBilan
                    name="Tirs"
                    value={
                      value === "total"
                        ? data.shots
                        : data.sessions[value].shots
                    }
                  />
                  <RowBilan
                    name="Tirs / Match"
                    value={(value === "total"
                      ? data.shots / data.gamesPlayed
                      : data.sessions[value].shots /
                        data.sessions[value].gamesPlayed
                    ).toFixed(2)}
                  />
                  <RowBilan
                    name="TRB"
                    value={`${(
                      (value === "total"
                        ? data.goals / data.shots
                        : data.sessions[value].goals /
                          data.sessions[value].shots) * 100
                    ).toFixed(2)}%`}
                  />
                </>
              )}
              {name === "Ponce" && (
                <>
                  <RowBilan
                    name="Buts encaissés"
                    value={
                      value === "total"
                        ? data.goalsAgainst
                        : data.sessions[value].goalsAgainst
                    }
                  />
                  <RowBilan
                    name="Arrêts"
                    value={
                      value === "total"
                        ? data.saves
                        : data.sessions[value].saves
                    }
                  />
                  <RowBilan
                    name="Arrêts / Match"
                    value={(value === "total"
                      ? data.saves / data.gamesPlayed
                      : data.sessions[value].saves /
                        data.sessions[value].gamesPlayed
                    ).toFixed(2)}
                  />
                </>
              )}
              <RowBilan
                name="Passes"
                value={
                  value === "total"
                    ? data.passesmade
                    : data.sessions[value].passesmade
                }
              />
              <RowBilan
                name="Passes / Match"
                value={(value === "total"
                  ? data.passattempts / data.gamesPlayed
                  : data.sessions[value].passattempts /
                    data.sessions[value].gamesPlayed
                ).toFixed(2)}
              />
              <RowBilan
                name="TRP"
                value={`${(
                  (value === "total"
                    ? data.passesmade / data.passattempts
                    : data.sessions[value].passesmade /
                      data.sessions[value].passattempts) * 100
                ).toFixed(2)}%`}
              />
              {name !== "Ponce" && (
                <>
                  <RowBilan
                    name="Tacles"
                    value={
                      value === "total"
                        ? data.tacklesmade
                        : data.sessions[value].tacklesmade
                    }
                  />
                  <RowBilan
                    name="Tacles / Match"
                    value={(value === "total"
                      ? data.tackleattempts / data.gamesPlayed
                      : data.sessions[value].tackleattempts /
                        data.sessions[value].gamesPlayed
                    ).toFixed(2)}
                  />
                  <RowBilan
                    name="TRT"
                    value={`${(
                      (value === "total"
                        ? data.tacklesmade / data.tackleattempts
                        : data.sessions[value].tacklesmade /
                          data.sessions[value].tackleattempts) * 100
                    ).toFixed(2)}%`}
                  />
                </>
              )}
              <RowBilan
                name="Homme du match"
                value={value === "total" ? data.mom : data.sessions[value].mom}
              />
              <RowBilan
                name="Cartons rouge"
                value={
                  value === "total"
                    ? data.redcards
                    : data.sessions[value].redcards
                }
              />
            </div>
          </DialogContent>
        </DialogOverlay>
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
      <Player data={players["Etoiles"]} name="Etoiles" top="75%" left="20%" />
      <Player top="80%" left="40%" />
      <Player top="80%" left="60%" />
      <Player top="75%" left="80%" />
      <Player data={players["MisterMV"]} name="MisterMV" top="55%" left="50%" />
      <Player data={players["Domingo"]} name="Domingo" top="45%" left="35%" />
      <Player data={players["Xari"]} name="Xari" top="45%" left="65%" />
      <Player data={players["Rivenzi"]} name="Rivenzi" top="25%" left="25%" />
      <Player data={players["Jiraya"]} name="Jiraya" top="25%" left="75%" />
      <Player data={players["DFG"]} name="DFG" top="15%" left="50%" />
    </div>
  );
};

export default Stats;
