export default async (_, res) => {
  const matchsResponse = await fetch(
    "https://proclubs.ea.com/api/fifa/clubs/matches?matchType=gameType9&platform=ps4&clubIds=16557521",
    {
      headers: {
        Referer: "https://www.ea.com/",
      },
    }
  );
  const matchs = await matchsResponse.json();

  return res.status(200).json(matchs);
};
