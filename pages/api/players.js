import Cors from "cors";
import Joi from "joi";

import initMiddleware from "../../lib/init-middleware";
import { getPlayers } from "../../lib/database";
import validate from "../../lib/validation";

const schema = Joi.object({});

const cors = initMiddleware(
  Cors({
    methods: ["GET"],
  })
);

export default validate({ query: schema }, async (req, res) => {
  await cors(req, res);

  switch (req.method) {
    case "GET":
      try {
        const players = await getPlayers();
        res.status(200).json(players);
      } catch (error) {
        console.error(error);
        res.status(500).end();
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end();
      break;
  }
});
