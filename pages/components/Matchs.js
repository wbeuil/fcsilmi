import Image from "next/image";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from "@reach/accordion";

import "@reach/accordion/styles.css";

const DEFAULT_CLUB =
  "https://media.contentapi.ea.com/content/dam/ea/fifa/fifa-21/pro-clubs/common/pro-clubs/crest-default.png";

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
  return (
    <Accordion
      collapsible
      className="w-full max-w-screen-md flex flex-col mx-auto my-8"
    >
      <AccordionItem className="w-full bg-white flex flex-col rounded-xl overflow-hidden shadow-xl p-8">
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
            <span className="text-6xl">2</span>
          </div>

          <span className="text-6xl mx-5">:</span>

          <div className="flex flex-row justify-between items-center w-1/2">
            <span className="text-6xl">1</span>
            <div className="flex flex-col items-center">
              <div style={{ width: "100px", height: "100px" }}>
                <Image
                  src={DEFAULT_CLUB}
                  alt="Default"
                  width={100}
                  height={100}
                />
              </div>
              <p className="font-bold text-xl">DEFAULT</p>
            </div>
          </div>
        </div>

        <AccordionButton
          className="text-4xl text-gray-400 self-center rounded-full border-2 border-gray-300 border-solid focus:outline-none focus:ring focus:border-blue-300"
          style={{ width: "44px" }}
        >
          +
        </AccordionButton>

        <AccordionPanel className="mt-8">
          <RowMatch name="Tirs cadrés" valueA="12" valueB="6" />
          <RowMatch name="Arrêts" valueA="7" valueB="0" />
          <RowMatch name="Tacles" valueA="13" valueB="13" />
          <RowMatch name="Tacles tentés" valueA="13" valueB="13" />
          <RowMatch name="Passes" valueA="64" valueB="76" />
          <RowMatch name="Passes tentées" valueA="64" valueB="76" />
          <RowMatch name="Cartons rouges" valueA="0" valueB="1" />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default Matchs;
