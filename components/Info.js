import { PieChart } from "react-minimal-pie-chart";
import Image from "next/image";

const Graph = ({ totalGames, data }) => {
  return (
    <div className="relative">
      <PieChart
        className="p-8"
        style={{ maxWidth: "350px" }}
        data={data}
        lineWidth={15}
        paddingAngle={5}
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
    </div>
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

const Information = ({ info }) => {
  const data = [
    { title: "Victoires", value: parseInt(info.wins, 10), color: "#34d399" },
    { title: "Défaites", value: parseInt(info.losses), color: "#f87171" },
    { title: "Nuls", value: parseInt(info.ties, 10), color: "#d1d5db" },
  ];

  return (
    <div className="w-full flex flex-col items-center my-8">
      <div className="bg-white dark:bg-gray-800 w-full max-w-screen-lg flex flex-col md:flex-row justify-between rounded-xl overflow-hidden shadow-xl mb-8">
        <div className="w-full md:w-1/2 flex flex-col p-8 md:mr-4">
          <Heading name="bilan" />

          <RowBilan name="Total points" value={info.overallRankingPoints} />
          <RowBilan name="Saisons disputées" value={info.seasons} />
          <RowBilan name="Meilleur division" value={info.bestDivision} />
          <RowBilan name="Titres remportés" value={info.titlesWon} />
          <RowBilan name="Championnats remportés" value={info.leaguesWon} />
          <RowBilan name="Coupes remportées" value={info.totalCupsWon} />
          <RowBilan name="Promotions" value={info.promotions} />
          <RowBilan name="Relégations" value={info.relegations} />
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:ml-4 mb-4">
          <Graph totalGames={info.totalGames} data={data} />
          <div>
            {data.map((d, i) => (
              <div key={i} className="flex flex-row items-center">
                <span
                  className="mr-2"
                  style={{
                    width: "20px",
                    height: "20px",
                    backgroundColor: d.color,
                  }}
                />
                <p className="mr-2">{d.value}</p>
                <p className="text-gray-500">{d.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 w-full max-w-screen-lg flex flex-col rounded-xl shadow-xl my-8 p-8">
        <Heading name="saison actuelle" />

        <div className="w-full grid grid-cols-2 md:grid-cols-3">
          <div className="flex flex-col items-center border-r border-solid border-gray-200">
            <span className="text-xl font-bold">Division</span>
            <Image
              src={`https://media.contentapi.ea.com/content/dam/eacom/fifa/pro-clubs/divisioncrest${info.currentDivision}.png`}
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
              {info.points}
            </span>
          </div>

          <div className="flex flex-col items-center col-span-2 md:col-span-1 mt-8 md:mt-0">
            <span className="text-xl font-bold">
              Résultats: {info.seasonWins}-{info.seasonLosses}-{info.seasonTies}{" "}
              (V-D-N)
            </span>
            <div
              className="w-full flex flex-row items-center justify-center"
              style={{ height: "100px" }}
            >
              {info.recentResults.map((r, i) => {
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
