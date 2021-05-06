const TeamCard = ({ team }) => {
  const color = team === "fcsilmi" ? "#fbd078" : "#da3947";
  const text = team === "fcsilmi" ? "ici c'est silmi" : "nous sommes légion";
  const backgroundStyle =
    team === "fcsilmi"
      ? {
          backgroundImage: "url(/images/fcsilmi-var.png)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "-10%",
        }
      : {
          backgroundImage: "url(/images/crouton-var.png)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "115%",
        };

  return (
    <div
      className="flex flex-col justify-between overflow-hidden rounded-xl md:rounded-3xl border-4 p-2 md:p-8 team-card"
      style={{
        borderColor: color,
        backgroundColor: "#141414",
        ...backgroundStyle,
      }}
    >
      <p className="text-2xl md:text-6xl font-bold uppercase text-center text-white">
        {text}
      </p>
      <div>
        <p className="text-md md:text-3xl font-bold md:mb-2 text-white">
          Showmatch FC Silmi vs Team Crouton
        </p>
        <p className="text-sm md:text-xl font-bold uppercase text-gray-400">
          JEUDI 6 MAI 2021, EN LIGNE
        </p>
      </div>
    </div>
  );
};

export default TeamCard;
