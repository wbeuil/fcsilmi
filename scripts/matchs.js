const fetch = require("node-fetch");
const path = require("path");
const fs = require("fs");

const matchsDirectoryPath = path.join(__dirname, "../data/matchs");

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
  1690794610: "Loann",
};

const nbr = process.argv[2] || "5";

const fetchMatchs = async () => {
  let matchs = [];

  try {
    const matchsResponse = await fetch(
      `https://proclubs.ea.com/api/fifa/clubs/matches?matchType=gameType9&platform=ps4&clubIds=16557521&maxResultCount=${nbr}`,
      {
        headers: {
          Referer: "https://www.ea.com/",
        },
      }
    );
    matchs = await matchsResponse.json();
  } catch (error) {
    console.error(error);
  }

  return matchs;
};

const getImage = (club) => {
  const url = `https://fifa21.content.easports.com/fifa/fltOnlineAssets/05772199-716f-417d-9fe0-988fa9899c4d/2021/fifaweb/crests/256x256`;
  if (club.details.customKit.isCustomTeam === "1") {
    return `${url}/l${club.details.customKit.crestAssetId}.png`;
  }
  return `${url}/l${club.details.teamId}.png`;
};

const getCleanSheets = (match) => {
  switch (match.clubs.fcsilmi.result) {
    case "1":
    case "4":
    case "16385":
      return match.clubs.contestant.goals === "0" ? "1" : "0";
    default:
      return "0";
  }
};

const parseMatch = (m) => {
  const contestant = Object.keys(m.clubs).find((id) => id !== FCSILMI);

  let match = {
    id: m.matchId,
    timestamp: m.timestamp,
    clubs: {
      fcsilmi: {
        result: m.clubs[FCSILMI].result,
        goals: m.clubs[FCSILMI].goals,
        shots: m.aggregate[FCSILMI].shots,
        saves: m.aggregate[FCSILMI].saves,
        tacklesmade: m.aggregate[FCSILMI].tacklesmade,
        tackleattempts: m.aggregate[FCSILMI].tackleattempts,
        passesmade: m.aggregate[FCSILMI].passesmade,
        passattempts: m.aggregate[FCSILMI].passattempts,
        redcards: m.aggregate[FCSILMI].redcards,
      },
      contestant: {
        name: m.clubs[contestant].details?.name.trim() || "--",
        image: m.clubs[contestant].details ? getImage(m.clubs[contestant]) : "",
        goals: m.clubs[contestant].goals,
        shots: m.aggregate[contestant].shots,
        saves: m.aggregate[contestant].saves,
        tacklesmade: m.aggregate[contestant].tacklesmade,
        tackleattempts: m.aggregate[contestant].tackleattempts,
        passesmade: m.aggregate[contestant].passesmade,
        passattempts: m.aggregate[contestant].passattempts,
        redcards: m.aggregate[contestant].redcards,
      },
    },
    players: {},
  };
  Object.keys(m.players[FCSILMI]).forEach((key) => {
    match.players[ids[key]] = {
      rating: m.players[FCSILMI][key].rating,
      goals: m.players[FCSILMI][key].goals,
      shots: m.players[FCSILMI][key].shots,
      saves: m.players[FCSILMI][key].saves,
      tacklesmade: m.players[FCSILMI][key].tacklesmade,
      tackleattempts: m.players[FCSILMI][key].tackleattempts,
      passesmade: m.players[FCSILMI][key].passesmade,
      passattempts: m.players[FCSILMI][key].passattempts,
      redcards: m.players[FCSILMI][key].redcards,
      mom: m.players[FCSILMI][key].mom,
      assists: m.players[FCSILMI][key].assists,
      cleansheets: "0",
    };
  });

  if (match.players["Ponce"]) {
    match.players["Ponce"].cleansheets = getCleanSheets(match);
  }

  return match;
};

fetchMatchs().then((res) => {
  const matchs = res.map((match) => parseMatch(match));
  const files = fs.readdirSync(matchsDirectoryPath);

  files.sort((a, b) => {
    const first = a.split(".")[0];
    const second = b.split(".")[0];

    return first - second;
  });

  let tmp = [];
  files.forEach((file) => {
    const filePath = path.join(matchsDirectoryPath, file);
    const data = fs.readFileSync(filePath);
    const val = JSON.parse(data);
    tmp.push(...val);
  });
  tmp.unshift(...matchs);

  let index = 0;
  const chunk = 10;
  for (i = 0; i < tmp.length; i += chunk) {
    const arr = tmp.slice(i, i + chunk);
    const json = JSON.stringify(arr);
    const filePath = path.join(matchsDirectoryPath, `${index}.json`);
    fs.writeFile(filePath, json, (err) => {
      if (err) return console.error(err);
    });
    index++;
  }
});
