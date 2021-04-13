import { promises as fs } from "fs";
import path from "path";

const getName = (id) => {
  switch (id) {
    case "rivenzi":
      return "Rivenzi";
    case "xari":
      return "Xari";
    case "etoiles":
      return "Etoiles";
    case "domingo":
      return "Domingo";
    case "mv":
      return "MisterMV";
    case "ponce":
      return "Ponce";
    case "dfg":
      return "DFG";
    case "jiraya":
      return "Jiraya";
    default:
      throw new Error(`This player does not exist: ${id}`);
  }
};

export async function getInfo() {
  const dataDirectory = path.join(process.cwd(), "data");
  const infoPath = path.join(dataDirectory, "info.json");
  return await fs.readFile(infoPath, "utf8");
}

export async function getMatchs(page = "0") {
  const dataDirectory = path.join(process.cwd(), "data");
  const matchsPath = path.join(dataDirectory, "matchs");
  return await fs.readFile(`${matchsPath}/${page}.json`, "utf8");
}

export async function getPlayers() {
  const dataDirectory = path.join(process.cwd(), "data");
  const playersPath = path.join(dataDirectory, "players.json");
  return await fs.readFile(playersPath, "utf8");
}

export async function getPlayer(id) {
  const dataDirectory = path.join(process.cwd(), "data");
  const playersPath = path.join(dataDirectory, "players.json");
  try {
    const res = await fs.readFile(playersPath, "utf8");
    const players = JSON.parse(res);
    return JSON.stringify(players[getName(id)]);
  } catch (error) {
    throw error;
  }
}
