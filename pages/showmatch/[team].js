import Head from "next/head";
import Error from "next/error";

import TeamCard from "../../components/TeamCard";

const Team = ({ team }) => {
  if (!team) {
    return <Error statusCode={404} />;
  }

  return (
    <div className="flex flex-col min-h-screen justify-center items-center bg-gray-900">
      <Head>
        <title>Showmatch - FC Silmi vs Team Crouton</title>
        <meta name="robots" content="noindex" />
        <meta
          name="description"
          content="Rendez-vous Jeudi 6 Mai à 21h pour un Showmatch entre le FC Silmi et la Team Crouton!"
        />
        <link rel="icon" type="image/svg+xml" href="/images/favicon.svg" />
        <link rel="alternate icon" href="/favicon.ico" />
        <link
          rel="mask-icon"
          href="/images/safari-pinned-tab.svg"
          color="#eeeeee"
        />
        <link
          rel="preload"
          href="/fonts/DIN-Condensed.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://fcsilmi.club/showmatch/${team}`}
        />
        <meta
          property="og:title"
          content="Showmatch - FC Silmi vs Team Crouton"
        />
        <meta
          property="og:description"
          content="Rendez-vous Jeudi 6 Mai à 21h pour un Showmatch entre le FC Silmi et la Team Crouton!"
        />
        <meta
          property="og:image"
          content={`https://fcsilmi.club/api/showmatch/${team}`}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@wbeuil" />
      </Head>
      <TeamCard team={team} />
    </div>
  );
};

export const getStaticProps = async ({ params }) => {
  const team = params?.team?.toString() || null;

  if (team && (team === "fcsilmi" || team === "croutongs")) {
    return {
      props: {
        team,
      },
      revalidate: 5,
    };
  }

  return {
    props: {
      team: null,
    },
    revalidate: 5,
  };
};

export const getStaticPaths = async () => {
  return Promise.resolve({
    paths: [],
    fallback: "blocking",
  });
};

export default Team;
