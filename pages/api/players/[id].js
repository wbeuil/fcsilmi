import Cors from "cors";
import Joi from "joi";

import initMiddleware from "../../../lib/init-middleware";
import { getPlayer } from "../../../lib/database";
import validate from "../../../lib/validation";

const schema = Joi.object({
  id: Joi.string()
    .required()
    .valid(
      "rivenzi",
      "xari",
      "etoiles",
      "domingo",
      "mv",
      "ponce",
      "dfg",
      "jiraya"
    ),
});

const cors = initMiddleware(
  Cors({
    methods: ["GET"],
  })
);

export default validate({ query: schema }, async (req, res) => {
  await cors(req, res);

  const { id } = req.query;

  switch (req.method) {
    case "GET":
      try {
        const player = await getPlayer(id);
        res.status(200).json(player);
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
