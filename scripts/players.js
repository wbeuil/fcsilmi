const fs = require("fs");

const matchsPath = "./data/matchs.json";
const jsonPath = "./data/players.json";

const players = {
  Rivenzi: {
    cover: "/images/rivenzi.png",
    image:
      "https://static-cdn.jtvnw.net/jtv_user_pictures/9ec51dd5-7289-4f41-b8eb-6cbf6f16f01a-profile_image-70x70.png",
    name: "Rodolphe Kerboeuf",
    twitch: "https://www.twitch.tv/rivenzi",
    gamesPlayed: 0,
    goals: 0,
    passesmade: 0,
    tacklesmade: 0,
    redcards: 0,
    mom: 0,
    rating: 0,
  },
  Xari: {
    cover: "/images/xari.png",
    image:
      "https://static-cdn.jtvnw.net/jtv_user_pictures/86214da3-1461-44d1-a2e9-43501af29538-profile_image-70x70.jpeg",
    name: "Luc-Arnaud Posée",
    twitch: "https://www.twitch.tv/xari",
    gamesPlayed: 0,
    goals: 0,
    passesmade: 0,
    tacklesmade: 0,
    redcards: 0,
    mom: 0,
    rating: 0,
  },
  Etoiles: {
    cover: "/images/etoiles.png",
    image:
      "https://static-cdn.jtvnw.net/jtv_user_pictures/4eecaab8-4de3-4bcc-b2b7-f3a03e8273a8-profile_image-70x70.png",
    name: "Rayou Desolaye",
    twitch: "https://www.twitch.tv/etoiles",
    gamesPlayed: 0,
    goals: 0,
    passesmade: 0,
    tacklesmade: 0,
    redcards: 0,
    mom: 0,
    rating: 0,
  },
  Domingo: {
    cover: "/images/domingo.png",
    image:
      "https://static-cdn.jtvnw.net/jtv_user_pictures/b84b2c78-9e28-4f13-b2fe-bee20a4824d5-profile_image-70x70.png",
    name: "Don Pablito",
    twitch: "https://www.twitch.tv/domingo",
    gamesPlayed: 0,
    goals: 0,
    passesmade: 0,
    tacklesmade: 0,
    redcards: 0,
    mom: 0,
    rating: 0,
  },
  MisterMV: {
    cover: "/images/mistermv.png",
    image:
      "https://static-cdn.jtvnw.net/jtv_user_pictures/2895647a-2e57-45ac-a42c-0a837d42f9a1-profile_image-70x70.png",
    name: "Connor De Virus",
    twitch: "https://www.twitch.tv/mistermv",
    gamesPlayed: 0,
    goals: 0,
    passesmade: 0,
    tacklesmade: 0,
    redcards: 0,
    mom: 0,
    rating: 0,
  },
  Ponce: {
    cover: "/images/ponce.png",
    image:
      "https://static-cdn.jtvnw.net/jtv_user_pictures/125bbc49-45d1-432c-92b3-f5aef1e7ab21-profile_image-70x70.png",
    name: "Ponpon Le Pipou",
    twitch: "https://www.twitch.tv/ponce",
    gamesPlayed: 0,
    goals: 0,
    passesmade: 0,
    tacklesmade: 0,
    redcards: 0,
    mom: 0,
    rating: 0,
  },
  DFG: {
    cover: "/images/dfg.png",
    image:
      "https://static-cdn.jtvnw.net/jtv_user_pictures/ece30d3a-5e81-48e2-b3f7-3b3a303c4e70-profile_image-70x70.png",
    name: "Ruper Entorsowki",
    twitch: "https://www.twitch.tv/drfeelgood",
    gamesPlayed: 0,
    goals: 0,
    passesmade: 0,
    tacklesmade: 0,
    redcards: 0,
    mom: 0,
    rating: 0,
  },
  Jiraya: {
    cover: "/images/jiraya.png",
    image:
      "https://static-cdn.jtvnw.net/jtv_user_pictures/d842070e-6d5c-4f97-b55c-097b9e627f4a-profile_image-70x70.png",
    name: "Jinedine Jidane",
    twitch: "https://www.twitch.tv/jirayalecochon",
    gamesPlayed: 0,
    goals: 0,
    passesmade: 0,
    tacklesmade: 0,
    redcards: 0,
    mom: 0,
    rating: 0,
  },
};

if (fs.existsSync(matchsPath)) {
  fs.readFile(
    matchsPath,
    (readFileCallback = (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const obj = JSON.parse(data);
        for (const match of obj) {
          Object.keys(match.players).map((key) => {
            players[key].gamesPlayed++;
            players[key].goals += parseInt(match.players[key].goals, 10);
            players[key].passesmade += parseInt(
              match.players[key].passesmade,
              10
            );
            players[key].tacklesmade += parseInt(
              match.players[key].tacklesmade,
              10
            );
            players[key].redcards += parseInt(match.players[key].redcards, 10);
            players[key].mom += parseInt(match.players[key].mom, 10);
            players[key].rating += parseFloat(match.players[key].rating);
          });
        }
        Object.keys(players).map((key) => {
          players[key].rating /= players[key].gamesPlayed;
          players[key].rating = players[key].rating.toFixed(2);
        });
        const json = JSON.stringify(players);
        fs.writeFile(jsonPath, json, (err) => {
          if (err) return console.error(err);
        });
      }
    })
  );
}
