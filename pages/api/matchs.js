import Cors from "cors";
import Joi from "joi";

import initMiddleware from "../../lib/init-middleware";
import { getMatchs } from "../../lib/database";
import validate from "../../lib/validation";

const schema = Joi.object({
  page: Joi.string().pattern(/^[0-9]+$/),
});

const cors = initMiddleware(
  Cors({
    methods: ["GET"],
  })
);

export default validate({ query: schema }, async (req, res) => {
  await cors(req, res);

  const { page } = req.query;

  switch (req.method) {
    case "GET":
      try {
        const matchs = await getMatchs(page);
        res.status(200).json(matchs);
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
