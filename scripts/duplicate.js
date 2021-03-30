const path = require("path");
const fs = require("fs");

const matchsDirectoryPath = path.join(__dirname, "../data/matchs");

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

const isDuplicate = (match, matchs) => {
  return matchs.filter((m) => m.id === match.id).length > 1;
};

for (const match of matchs) {
  if (isDuplicate(match, matchs)) {
    console.log("FOUND DUPLICATE", match);
  }
}
