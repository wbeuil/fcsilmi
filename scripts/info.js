const fetch = require("node-fetch");
const path = require("path");
const fs = require("fs");

const matchsDirectoryPath = path.join(__dirname, "../data/matchs");
const jsonPath = "./data/info.json";

const fetchInfo = async () => {
  let info = {};

  try {
    const infoResponse = await fetch(
      "https://proclubs.ea.com/api/fifa/clubs/seasonalStats?platform=ps4&clubIds=16557521",
      {
        headers: {
          Referer: "https://www.ea.com/",
        },
      }
    );
    info = await infoResponse.json();
  } catch (error) {
    console.error(error);
  }

  return info;
};

const parseSession = (session) => {
  let wins = 0;
  let losses = 0;
  let ties = 0;
  let goals = 0;
  let goalsAgainst = 0;
  let shots = 0;
  let saves = 0;
  let tacklesmade = 0;
  let tackleattempts = 0;
  let passesmade = 0;
  let passattempts = 0;
  let redcards = 0;

  for (const match of session) {
    if (
      match.clubs.fcsilmi.result === "1" ||
      match.clubs.fcsilmi.result === "16385"
    )
      wins++;
    if (
      match.clubs.fcsilmi.result === "2" ||
      match.clubs.fcsilmi.result === "10"
    )
      losses++;
    if (match.clubs.fcsilmi.result === "4") ties++;
    goals += parseInt(match.clubs.fcsilmi.goals, 10);
    goalsAgainst += parseInt(match.clubs.contestant.goals, 10);
    shots += parseInt(match.clubs.fcsilmi.shots, 10);
    saves += parseInt(match.clubs.fcsilmi.saves, 10);
    tacklesmade += parseInt(match.clubs.fcsilmi.tacklesmade, 10);
    tackleattempts += parseInt(match.clubs.fcsilmi.tackleattempts, 10);
    passesmade += parseInt(match.clubs.fcsilmi.passesmade, 10);
    passattempts += parseInt(match.clubs.fcsilmi.passattempts, 10);
    redcards += parseInt(match.clubs.fcsilmi.redcards, 10);
  }

  return {
    games: session.length,
    wins,
    losses,
    ties,
    goals,
    goalsAgainst,
    shots,
    saves,
    tacklesmade,
    tackleattempts,
    passesmade,
    passattempts,
    redcards,
  };
};

const parseInfo = (info) => {
  return {
    totalGames: info.totalGames,
    wins: info.wins,
    losses: info.losses,
    ties: info.ties,
    overallRankingPoints: info.overallRankingPoints,
    seasons: info.seasons,
    bestDivision: info.bestDivision,
    titlesWon: info.titlesWon,
    leaguesWon: info.leaguesWon,
    totalCupsWon: info.totalCupsWon,
    promotions: info.promotions,
    relegations: info.relegations,
    currentDivision: info.currentDivision,
    points: info.points,
    seasonWins: info.seasonWins,
    seasonLosses: info.seasonLosses,
    seasonTies: info.seasonTies,
    recentResults: info.recentResults,
    alltimeGoals: info.alltimeGoals,
    alltimeGoalsAgainst: info.alltimeGoalsAgainst,
    sessions: {},
  };
};

const listMatchsBySessions = () => {
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

const getStartDate = (match) => {
  const startDate = new Date(match.timestamp * 1000);
  const day = `0${startDate.getDate()}`.slice(-2);
  const month = `0${startDate.getMonth() + 1}`.slice(-2);
  const year = `${startDate.getFullYear()}`;
  return `${day}/${month}/${year}`;
};

fetchInfo().then((res) => {
  const matchsBySessions = listMatchsBySessions();
  const info = parseInfo(res[0]);

  for (const session of matchsBySessions) {
    const tmp = parseSession(session);
    const firstGame = session[session.length - 1];
    const startDate = getStartDate(firstGame);
    info.sessions[startDate] = tmp;
  }

  const json = JSON.stringify(info);
  fs.writeFile(jsonPath, json, (err) => {
    if (err) return console.error(err);
  });
});
