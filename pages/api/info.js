export default async (_, res) => {
  const infoResponse = await fetch(
    "https://proclubs.ea.com/api/fifa/clubs/seasonalStats?platform=ps4&clubIds=16557521",
    {
      headers: {
        Referer: "https://www.ea.com/",
      },
    }
  );
  const info = await infoResponse.json();

  return res.status(200).json({
    ...info[0],
  });
};
