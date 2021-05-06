import fs from "fs";
import path from "path";

export default async (req, res) => {
  const { team } = req.query || {};

  if (team && (team === "fcsilmi" || team === "croutongs")) {
    const url = path.join(process.cwd(), `public/images/showmatch-${team}.png`);
    const file = fs.readFileSync(url);

    res.setHeader("Content-Type", `image/png`);
    res.setHeader(
      "Cache-Control",
      `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`
    );
    res.statusCode = 200;
    res.send(file);
  } else {
    res.status(404).send("Not Found");
  }
};
