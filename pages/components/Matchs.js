import Image from "next/image";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from "@reach/accordion";
import useSWR from "swr";

import players from "./data.js";
import fetcher from "../utils.js";
import ArrowIcon from "../icons/arrow.svg";

import "@reach/accordion/styles.css";

const DEFAULT_CLUB =
  "https://media.contentapi.ea.com/content/dam/ea/fifa/fifa-21/pro-clubs/common/pro-clubs/crest-default.png";

const FCSILMI = "16557521";

const ids = {
  285834324: "MisterMV",
  1772945508: "Ponce",
  1786701096: "Etoiles",
  1874355975: "Rivenzi",
  1887463787: "Domingo",
  1902980612: "Jiraya",
  1003508400420: "DFG",
  1005652352361: "Xari",
};

const RowPlayer = ({ name, value }) => {
  return (
    <div className="flex flex-row justify-between items-center border-b border-solid border-gray-200">
      <p>{name}</p>
      <span className="text-lg mr-2 md:mr-8">{value}</span>
    </div>
  );
};

const RowMatch = ({ name, valueA, valueB }) => {
  return (
    <div
      className="flex flex-row justify-between items-center border-b border-solid border-gray-200"
      style={{ height: "48px" }}
    >
      <span className="w-1/5 text-2xl text-center">{valueA}</span>
      <p>{name}</p>
      <span className="w-1/5 text-2xl text-center">{valueB}</span>
    </div>
  );
};

const Matchs = () => {
  const { data: d } = useSWR(`/api/matchs`, fetcher);

  if (!d) {
    return null;
  }

  return (
    <Accordion
      collapsible
      className="w-full max-w-screen-md flex flex-col mx-auto my-8"
    >
      {d.map((match) => {
        const contestant = Object.keys(match.clubs).find(
          (id) => id !== FCSILMI
        );

        return (
          <AccordionItem
            key={match.matchId}
            className="w-full bg-white flex flex-col rounded-xl overflow-hidden shadow-xl p-4 md:p-8 mb-8"
          >
            <div className="flex flex-row items-center">
              <div className="flex flex-row justify-between items-center w-1/2">
                <div className="flex flex-col items-center">
                  <div style={{ width: "100px", height: "100px" }}>
                    <Image
                      src="/images/fcsilmi-flag.png"
                      alt="FC Silmi"
                      width={100}
                      height={100}
                    />
                  </div>
                  <p className="font-bold text-xl">FC SILMI</p>
                </div>
                <span className="text-6xl">{match.clubs[FCSILMI].goals}</span>
              </div>

              <span className="text-6xl mx-2 md:mx-5">:</span>

              <div className="flex flex-row justify-between items-center w-1/2">
                <span className="text-6xl">
                  {match.clubs[contestant].goals}
                </span>
                <div className="flex flex-col items-center">
                  <div style={{ width: "100px", height: "100px" }}>
                    <Image
                      src={DEFAULT_CLUB}
                      alt="Default"
                      width={100}
                      height={100}
                    />
                  </div>
                  <p className="font-bold text-xl uppercase">
                    {match.clubs[contestant].details?.name || "Unknown"}
                  </p>
                </div>
              </div>
            </div>

            <AccordionButton
              className="text-4xl text-gray-400 self-center rounded-full border-2 border-gray-300 border-solid focus:outline-none focus:ring focus:border-blue-300"
              style={{ width: "44px" }}
            >
              +
            </AccordionButton>

            <AccordionPanel className="mt-8 focus:outline-none">
              <RowMatch
                name="Tirs cadrés"
                valueA={match.aggregate[FCSILMI].shots}
                valueB={match.aggregate[contestant].shots}
              />
              <RowMatch
                name="Arrêts"
                valueA={match.aggregate[FCSILMI].saves}
                valueB={match.aggregate[contestant].saves}
              />
              <RowMatch
                name="Tacles"
                valueA={match.aggregate[FCSILMI].tacklesmade}
                valueB={match.aggregate[contestant].tacklesmade}
              />
              <RowMatch
                name="Tacles tentés"
                valueA={match.aggregate[FCSILMI].tackleattempts}
                valueB={match.aggregate[contestant].tackleattempts}
              />
              <RowMatch
                name="Passes"
                valueA={match.aggregate[FCSILMI].passesmade}
                valueB={match.aggregate[contestant].passesmade}
              />
              <RowMatch
                name="Passes tentées"
                valueA={match.aggregate[FCSILMI].passattempts}
                valueB={match.aggregate[contestant].passattempts}
              />
              <RowMatch
                name="Cartons rouges"
                valueA={match.aggregate[FCSILMI].redcards}
                valueB={match.aggregate[contestant].redcards}
              />

              <Accordion collapsible className="mt-8">
                {Object.keys(match.players[FCSILMI]).map((key) => (
                  <AccordionItem key={key}>
                    <AccordionButton className="flex flex-row items-center text-gray-500 pr-2 rounded-2 focus:outline-none focus:ring focus:border-blue-300">
                      <ArrowIcon width={24} />
                      <span className="text-xl">
                        {players[ids[key]].name} (@{ids[key]})
                      </span>
                    </AccordionButton>

                    <AccordionPanel className="mt-4 mb-8 px-8 focus:outline-none">
                      <RowPlayer
                        name="Note du match"
                        value={match.players[FCSILMI][key].rating}
                      />
                      <RowPlayer
                        name="Buts"
                        value={match.players[FCSILMI][key].goals}
                      />
                      <RowPlayer
                        name="Tirs cadrés"
                        value={match.players[FCSILMI][key].shots}
                      />
                      <RowPlayer
                        name="Arrêts"
                        value={match.players[FCSILMI][key].saves}
                      />
                      <RowPlayer
                        name="Tacles"
                        value={match.players[FCSILMI][key].tacklesmade}
                      />
                      <RowPlayer
                        name="Tacles tentés"
                        value={match.players[FCSILMI][key].tackleattempts}
                      />
                      <RowPlayer
                        name="Passes"
                        value={match.players[FCSILMI][key].passesmade}
                      />
                      <RowPlayer
                        name="Passes tentées"
                        value={match.players[FCSILMI][key].passattempts}
                      />
                      <RowPlayer
                        name="Cartons rouges"
                        value={match.players[FCSILMI][key].redcards}
                      />
                    </AccordionPanel>
                  </AccordionItem>
                ))}
              </Accordion>
            </AccordionPanel>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

export default Matchs;
