import { Chart } from "react-google-charts";
import Image from "next/image";
import useSWR from "swr";

import fetcher from "../utils/fetcher.js";

const Graph = ({ totalGames, data }) => {
  return (
    <>
      <Chart
        width={"100%"}
        height={"100%"}
        style={{ maxWidth: "400px" }}
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={data}
        options={{
          pieHole: 0.8,
          legend: "none",
          pieSliceText: "none",
          slices: [
            {
              color: "#34d399",
            },
            {
              color: "#f87171",
            },
            {
              color: "#d1d5db",
            },
          ],
        }}
      />
      <p
        className="absolute text-2xl font-bold italic"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {totalGames} matchs
      </p>
    </>
  );
};

export const RowBilan = ({ name, value }) => {
  return (
    <div
      className="flex flex-row justify-between items-center border-b border-solid border-gray-200"
      style={{ height: "48px" }}
    >
      <p>{name}</p>
      <span className="text-2xl mr-2 md:mr-8">{value}</span>
    </div>
  );
};

const Heading = ({ name }) => {
  let emoji, gradient;

  switch (name) {
    case "bilan":
      emoji = "⭐️";
      gradient = "from-yellow-500 to-orange-500";
      break;
    case "saison actuelle":
      emoji = "⚽️";
      gradient = "from-pink-500 to-rose-500";
      break;
    default:
      break;
  }

  return (
    <div className="flex flex-row items-center mb-8">
      <div
        className={`bg-gradient-to-br ${gradient} flex justify-center items-center rounded-md mr-3`}
        style={{ width: "30px", height: "30px" }}
      >
        <span>{emoji}</span>
      </div>
      <h2 className="text-xl uppercase">{name}</h2>
    </div>
  );
};

const Information = () => {
  const { data: d } = useSWR(`/api/info`, fetcher);

  if (!d) {
    return null;
  }

  const data = [
    ["Résultats", "Nombre de matchs"],
    ["Victoires", parseInt(d.wins, 10)],
    ["Défaites", parseInt(d.losses)],
    ["Nuls", parseInt(d.ties, 10)],
  ];

  return (
    <div className="w-full flex flex-col items-center my-8">
      <div className="bg-white w-full max-w-screen-lg flex flex-col md:flex-row justify-between rounded-xl overflow-hidden shadow-xl mb-8">
        <div className="w-full md:w-1/2 flex flex-col p-8 md:mr-4">
          <Heading name="bilan" />

          <RowBilan name="Total points" value={d.overallRankingPoints} />
          <RowBilan name="Saisons disputées" value={d.seasons} />
          <RowBilan name="Meilleur division" value={d.bestDivision} />
          <RowBilan name="Titres remportés" value={d.titlesWon} />
          <RowBilan name="Championnats remportés" value={d.leaguesWon} />
          <RowBilan name="Coupes remportées" value={d.totalCupsWon} />
          <RowBilan name="Promotions" value={d.promotions} />
          <RowBilan name="Relégations" value={d.relegations} />
        </div>

        <div className="w-full md:w-1/2 relative flex flex-col justify-center items-center md:ml-4">
          <Graph totalGames={d.totalGames} data={data} />
        </div>
      </div>

      <div className="bg-white w-full max-w-screen-lg flex flex-col rounded-xl shadow-xl my-8 p-8">
        <Heading name="saison actuelle" />

        <div className="w-full grid grid-cols-2 md:grid-cols-3">
          <div className="flex flex-col items-center border-r border-solid border-gray-200">
            <span className="text-xl font-bold">Division</span>
            <Image
              src={`https://media.contentapi.ea.com/content/dam/eacom/fifa/pro-clubs/divisioncrest${d.currentDivision}.png`}
              alt="Division actuelle"
              width={100}
              height={100}
            />
          </div>

          <div className="flex flex-col items-center md:border-r md:border-solid md:border-gray-200">
            <span className="text-xl font-bold">Points</span>
            <span
              className="text-5xl font-bold text-center"
              style={{ width: "100px", height: "100px", lineHeight: "100px" }}
            >
              {d.points}
            </span>
          </div>

          <div className="flex flex-col items-center col-span-2 md:col-span-1 mt-8 md:mt-0">
            <span className="text-xl font-bold">
              Résultats: {d.seasonWins}-{d.seasonLosses}-{d.seasonTies} (V-D-N)
            </span>
            <div
              className="w-full flex flex-row items-center justify-center"
              style={{ height: "100px" }}
            >
              {d.recentResults.map((r, i) => {
                let color;

                switch (r) {
                  case "wins":
                    color = "bg-green-400";
                    break;
                  case "losses":
                    color = "bg-red-400";
                    break;
                  default:
                    color = "bg-gray-300";
                    break;
                }

                return (
                  <span
                    key={i}
                    className={`rounded-full mx-1 ${color}`}
                    style={{ width: "20px", height: "20px" }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Information;
