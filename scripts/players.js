const fs = require("fs");
const path = require("path");

const matchsDirectoryPath = path.join(__dirname, "../data/matchs");
const jsonPath = "./data/players.json";

const emptyValue = () => ({
  gamesPlayed: 0,
  goals: 0,
  goalsAgainst: 0,
  shots: 0,
  saves: 0,
  passesmade: 0,
  passattempts: 0,
  tacklesmade: 0,
  tackleattempts: 0,
  redcards: 0,
  mom: 0,
  rating: 0,
  assists: 0,
  cleansheets: 0,
});

const players = {
  Rivenzi: {
    cover: "/images/rivenzi.png",
    image:
      "https://static-cdn.jtvnw.net/jtv_user_pictures/9ec51dd5-7289-4f41-b8eb-6cbf6f16f01a-profile_image-70x70.png",
    name: "Rodolphe Kerboeuf",
    twitch: "https://www.twitch.tv/rivenzi",
    ...emptyValue(),
    sessions: {},
  },
  Xari: {
    cover: "/images/xari.png",
    image:
      "https://static-cdn.jtvnw.net/jtv_user_pictures/86214da3-1461-44d1-a2e9-43501af29538-profile_image-70x70.jpeg",
    name: "Luc-Arnaud Posée",
    twitch: "https://www.twitch.tv/xari",
    ...emptyValue(),
    sessions: {},
  },
  Etoiles: {
    cover: "/images/etoiles.png",
    image:
      "https://static-cdn.jtvnw.net/jtv_user_pictures/4eecaab8-4de3-4bcc-b2b7-f3a03e8273a8-profile_image-70x70.png",
    name: "Rayou Desolaye",
    twitch: "https://www.twitch.tv/etoiles",
    ...emptyValue(),
    sessions: {},
  },
  Domingo: {
    cover: "/images/domingo.png",
    image:
      "https://static-cdn.jtvnw.net/jtv_user_pictures/b84b2c78-9e28-4f13-b2fe-bee20a4824d5-profile_image-70x70.png",
    name: "Don Pablito",
    twitch: "https://www.twitch.tv/domingo",
    ...emptyValue(),
    sessions: {},
  },
  MisterMV: {
    cover: "/images/mistermv.png",
    image:
      "https://static-cdn.jtvnw.net/jtv_user_pictures/2895647a-2e57-45ac-a42c-0a837d42f9a1-profile_image-70x70.png",
    name: "Connor De Virus",
    twitch: "https://www.twitch.tv/mistermv",
    ...emptyValue(),
    sessions: {},
  },
  Ponce: {
    cover: "/images/ponce.png",
    image:
      "https://static-cdn.jtvnw.net/jtv_user_pictures/125bbc49-45d1-432c-92b3-f5aef1e7ab21-profile_image-70x70.png",
    name: "Ponpon Le Pipou",
    twitch: "https://www.twitch.tv/ponce",
    ...emptyValue(),
    sessions: {},
  },
  DFG: {
    cover: "/images/dfg.png",
    image:
      "https://static-cdn.jtvnw.net/jtv_user_pictures/ece30d3a-5e81-48e2-b3f7-3b3a303c4e70-profile_image-70x70.png",
    name: "Ruper Entorsowki",
    twitch: "https://www.twitch.tv/drfeelgood",
    ...emptyValue(),
    sessions: {},
  },
  Jiraya: {
    cover: "/images/jiraya.png",
    image:
      "https://static-cdn.jtvnw.net/jtv_user_pictures/d842070e-6d5c-4f97-b55c-097b9e627f4a-profile_image-70x70.png",
    name: "Jinedine Jidane",
    twitch: "https://www.twitch.tv/jirayalecochon",
    ...emptyValue(),
    sessions: {},
  },
  Loann: {
    cover: "/images/loann.png",
    image:
      "https://static-cdn.jtvnw.net/jtv_user_pictures/27f7d31a-193e-4ba8-b2a3-b8e9e1ac3894-profile_image-70x70.png",
    name: "Lolo",
    twitch: "https://www.twitch.tv/low4n",
    ...emptyValue(),
    sessions: {},
  },
};

const listMatchsBySessions = (matchs) => {
  let session = 0;
  let matchsBySessions = [];
  let previousMatch = null;

  for (const match of matchs) {
    if (!previousMatch) {
      matchsBySessions.push([match]);
      previousMatch = match;
      continue;
    }

    const previousDate = new Date(previousMatch.timestamp * 1000);
    const date = new Date(match.timestamp * 1000);
    const timeDiff = previousDate.getTime() - date.getTime();
    const dayDiff = Math.floor(timeDiff / (1000 * 3600 * 24));

    if (dayDiff > 1) {
      session++;
      matchsBySessions.push([match]);
    } else {
      matchsBySessions[session].push(match);
    }
    previousMatch = match;
  }

  return matchsBySessions;
};

const parseSession = (session) => {
  const p = {
    Rivenzi: emptyValue(),
    Xari: emptyValue(),
    Etoiles: emptyValue(),
    Domingo: emptyValue(),
    MisterMV: emptyValue(),
    Ponce: emptyValue(),
    DFG: emptyValue(),
    Jiraya: emptyValue(),
    Loann: emptyValue(),
  };

  for (const match of session) {
    Object.keys(match.players).map((key) => {
      p[key].gamesPlayed++;
      p[key].goals += parseInt(match.players[key].goals, 10);
      p[key].goalsAgainst += parseInt(match.clubs.contestant.goals, 10);
      p[key].shots += parseInt(match.players[key].shots, 10);
      p[key].saves += parseInt(match.players[key].saves, 10);
      p[key].passesmade += parseInt(match.players[key].passesmade, 10);
      p[key].passattempts += parseInt(match.players[key].passattempts, 10);
      p[key].tacklesmade += parseInt(match.players[key].tacklesmade, 10);
      p[key].tackleattempts += parseInt(match.players[key].tackleattempts, 10);
      p[key].redcards += parseInt(match.players[key].redcards, 10);
      p[key].mom += parseInt(match.players[key].mom, 10);
      p[key].rating += parseFloat(match.players[key].rating);
      p[key].assists += parseInt(match.players[key].assists, 10);
      p[key].cleansheets += parseInt(match.players[key].cleansheets, 10);
    });
  }

  Object.keys(p).map((key) => {
    p[key].rating /= p[key].gamesPlayed;
    p[key].rating = p[key].rating.toFixed(2);

    if (isNaN(p[key].rating)) {
      p[key].rating = "-";
    }
  });

  return p;
};

const getStartDate = (match) => {
  const startDate = new Date(match.timestamp * 1000);
  const day = `0${startDate.getDate()}`.slice(-2);
  const month = `0${startDate.getMonth() + 1}`.slice(-2);
  const year = `${startDate.getFullYear()}`;
  return `${day}/${month}/${year}`;
};

let matchs = [];

const files = fs.readdirSync(matchsDirectoryPath);

files.sort((a, b) => {
  const first = a.split(".")[0];
  const second = b.split(".")[0];

  return first - second;
});

files.forEach((file) => {
  const filePath = path.join(matchsDirectoryPath, file);
  const data = fs.readFileSync(filePath);
  const val = JSON.parse(data);
  matchs.push(...val);
});

for (const match of matchs) {
  Object.keys(match.players).map((key) => {
    players[key].gamesPlayed++;
    players[key].goals += parseInt(match.players[key].goals, 10);
    players[key].goalsAgainst += parseInt(match.clubs.contestant.goals, 10);
    players[key].shots += parseInt(match.players[key].shots, 10);
    players[key].saves += parseInt(match.players[key].saves, 10);
    players[key].passesmade += parseInt(match.players[key].passesmade, 10);
    players[key].passattempts += parseInt(match.players[key].passattempts, 10);
    players[key].tacklesmade += parseInt(match.players[key].tacklesmade, 10);
    players[key].tackleattempts += parseInt(
      match.players[key].tackleattempts,
      10
    );
    players[key].redcards += parseInt(match.players[key].redcards, 10);
    players[key].mom += parseInt(match.players[key].mom, 10);
    players[key].rating += parseFloat(match.players[key].rating);
    players[key].assists += parseInt(match.players[key].assists, 10);
    players[key].cleansheets += parseInt(match.players[key].cleansheets, 10);
  });
}

Object.keys(players).map((key) => {
  players[key].rating /= players[key].gamesPlayed;
  players[key].rating = players[key].rating.toFixed(2);
});

const matchsBySessions = listMatchsBySessions(matchs);

for (const session of matchsBySessions) {
  const tmp = parseSession(session);
  const firstGame = session[session.length - 1];
  const startDate = getStartDate(firstGame);
  Object.keys(players).map((key) => {
    players[key].sessions[startDate] = tmp[key];
  });
}

const json = JSON.stringify(players);
fs.writeFile(jsonPath, json, (err) => {
  if (err) return console.error(err);
});
