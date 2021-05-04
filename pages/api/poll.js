export default async (req, res) => {
  const response = await fetch(
    "https://strawpoll.me/api/v2/polls/45221011"
  ).then((r) => r.json());

  res.status(200).json({ poll: response });
};
