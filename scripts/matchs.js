const fetch = require("node-fetch");
const fs = require("fs");

const jsonPath = "./data/matchs.json";

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
        image: m.clubs[contestant].details
          ? `https://fifa21.content.easports.com/fifa/fltOnlineAssets/05772199-716f-417d-9fe0-988fa9899c4d/2021/fifaweb/crests/256x256/l${m.clubs[contestant].details.customKit.crestAssetId}.png`
          : "",
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
    };
  });
  return match;
};

fetchMatchs().then((res) => {
  const matchs = res.map((match) => parseMatch(match));

  try {
    if (fs.existsSync(jsonPath)) {
      fs.readFile(
        jsonPath,
        (readFileCallback = (err, data) => {
          if (err) {
            console.error(err);
          } else {
            let obj = JSON.parse(data);
            obj.unshift(...matchs);
            const json = JSON.stringify(obj);
            fs.writeFile(jsonPath, json, (err) => {
              if (err) return console.error(err);
            });
          }
        })
      );
    }
  } catch (err) {
    console.error(err);
  }
});
