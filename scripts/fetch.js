const setCookie = require("set-cookie-parser");
const fetch = require("node-fetch");
const path = require("path");
const fs = require("fs");

const FCSILMI = "3130723";
const nbr = process.argv[2] || "5";
const directoryPath = path.join(__dirname, "../club-pro");

const fetchMatchs = async (Cookie) => {
  let matchs = [];

  try {
    const matchsResponse = await fetch(
      `https://proclubs.ea.com/api/fifa/clubs/matches?matchType=gameType9&platform=ps4&clubIds=${FCSILMI}&maxResultCount=${nbr}`,
      {
        headers: {
          Cookie,
          "User-Agent": "PostmanRuntime/7.28.4",
          Connection: "keep-alive",
          Accept: "*/*",
          "Accept-Encoding": "gzip, deflate, br",
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

const getStartDate = (match) => {
  const startDate = new Date(match.timestamp * 1000);
  const day = `0${startDate.getDate()}`.slice(-2);
  const month = `0${startDate.getMonth() + 1}`.slice(-2);
  const year = `${startDate.getFullYear()}`;
  return `${day}-${month}-${year}`;
};

fetch(`https://www.ea.com/user-data`, {
  headers: {
    Cookie: "EDGESCAPE_COUNTRY=FR; EDGESCAPE_REGION=IDF",
    "User-Agent": "PostmanRuntime/7.28.4",
    Connection: "keep-alive",
    Accept: "*/*",
    "Accept-Encoding": "gzip, deflate, br",
  },
}).then((res) => {
  const cookieHeaders = setCookie.splitCookiesString(
    res.headers.get("set-cookie")
  );
  const cookies = setCookie.parse(cookieHeaders);

  let Cookie = "";
  cookies.forEach((c) => (Cookie += `${c.name}=${c.value};`));

  fetchMatchs(Cookie).then((matchs) => {
    const firstGame = matchs[matchs.length - 1];
    const startDate = getStartDate(firstGame);
    const json = JSON.stringify(matchs);
    const filePath = path.join(directoryPath, `${startDate}.json`);
    fs.writeFile(filePath, json, (err) => {
      if (err) return console.error(err);
    });
  });
});
