/* eslint-disable @next/next/no-html-link-for-pages */
import Head from "next/head";
import { HomePage } from "../components/HomePage/HomePage";
import { Team, Calendar } from "../helpers/Types";
import styles from "../styles/Home.module.css";

export interface HomeProps {
  teams: Team[];
  calendar: Calendar;
}

const Home = ({ teams, calendar }: HomeProps) => {
  const title = "HNL Rezultati";
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Created by Dino Držaić" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.main}>
        <HomePage teams={teams} calendar={calendar} />
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const host = process.env.APP_BASE_URL || "http://localhost:3000";
  const teamsFile = await fetch(`${host}/api/teams`);
  const teamsFileJSON = await teamsFile.json();

  const calendarFile = await fetch(`${host}/api/matches`);
  const calendarFileJSON: Calendar = await calendarFile.json();

  return {
    props: {
      teams: teamsFileJSON.teams,
      calendar: calendarFileJSON,
    },
  };
}

export default Home;
