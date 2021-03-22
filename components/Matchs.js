import Image from "next/image";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from "@reach/accordion";

import players from "../utils/data.js";
import ArrowIcon from "../icons/arrow.svg";

import "@reach/accordion/styles.css";

const DEFAULT_CLUB =
  "https://media.contentapi.ea.com/content/dam/ea/fifa/fifa-21/pro-clubs/common/pro-clubs/crest-default.png";

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

const Matchs = ({ matchs }) => {
  return (
    <Accordion
      collapsible
      className="w-full max-w-screen-md flex flex-col mx-auto my-8"
    >
      {matchs.map((match) => (
        <AccordionItem
          key={match.id}
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
              <span className="text-6xl">{match.clubs.fcsilmi.goals}</span>
            </div>

            <span className="text-6xl mx-2 md:mx-5">:</span>

            <div className="flex flex-row justify-between items-center w-1/2">
              <span className="text-6xl">{match.clubs.contestant.goals}</span>
              <div className="flex flex-col items-center">
                <div
                  className="flex flex-col justify-center items-center"
                  style={{ width: "100px", height: "100px" }}
                >
                  <Image
                    src={match.clubs.contestant.image || DEFAULT_CLUB}
                    alt={match.clubs.contestant.name}
                    width={match.clubs.contestant.image ? 60 : 100}
                    height={match.clubs.contestant.image ? 60 : 100}
                  />
                </div>
                <p className="font-bold text-xl uppercase">
                  {match.clubs.contestant.name}
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
              valueA={match.clubs.fcsilmi.shots}
              valueB={match.clubs.contestant.shots}
            />
            <RowMatch
              name="Arrêts"
              valueA={match.clubs.fcsilmi.saves}
              valueB={match.clubs.contestant.saves}
            />
            <RowMatch
              name="Tacles"
              valueA={match.clubs.fcsilmi.tacklesmade}
              valueB={match.clubs.contestant.tacklesmade}
            />
            <RowMatch
              name="Tacles tentés"
              valueA={match.clubs.fcsilmi.tackleattempts}
              valueB={match.clubs.contestant.tackleattempts}
            />
            <RowMatch
              name="Passes"
              valueA={match.clubs.fcsilmi.passesmade}
              valueB={match.clubs.contestant.passesmade}
            />
            <RowMatch
              name="Passes tentées"
              valueA={match.clubs.fcsilmi.passattempts}
              valueB={match.clubs.contestant.passattempts}
            />
            <RowMatch
              name="Cartons rouges"
              valueA={match.clubs.fcsilmi.redcards}
              valueB={match.clubs.contestant.redcards}
            />

            <Accordion collapsible className="mt-8">
              {Object.keys(match.players).map((key) => (
                <AccordionItem key={key}>
                  <AccordionButton className="flex flex-row items-center text-gray-500 pr-2 rounded-2 focus:outline-none focus:ring focus:border-blue-300">
                    <ArrowIcon width={24} />
                    <span className="text-xl">
                      {players[key].name} (@{key})
                    </span>
                  </AccordionButton>

                  <AccordionPanel className="mt-4 mb-8 px-8 focus:outline-none">
                    <RowPlayer
                      name="Note du match"
                      value={match.players[key].rating}
                    />
                    <RowPlayer name="Buts" value={match.players[key].goals} />
                    <RowPlayer
                      name="Tirs cadrés"
                      value={match.players[key].shots}
                    />
                    <RowPlayer name="Arrêts" value={match.players[key].saves} />
                    <RowPlayer
                      name="Tacles"
                      value={match.players[key].tacklesmade}
                    />
                    <RowPlayer
                      name="Tacles tentés"
                      value={match.players[key].tackleattempts}
                    />
                    <RowPlayer
                      name="Passes"
                      value={match.players[key].passesmade}
                    />
                    <RowPlayer
                      name="Passes tentées"
                      value={match.players[key].passattempts}
                    />
                    <RowPlayer
                      name="Cartons rouges"
                      value={match.players[key].redcards}
                    />
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default Matchs;
