import React from "react";
import { RoundPage } from "../../components/RoundPage/RoundPage";
import { Team, Round, Calendar } from "../../helpers/Types";

export interface RoundProps {
  teams: Team[];
  round: Round;
}

export const RoundIdPage: React.FC<RoundProps> = ({ teams, round }) => {
  return <RoundPage round={round} teams={teams} />;
};

export async function getServerSideProps(context: any) {
  const { id } = context.query;
  const host = process.env.APP_BASE_URL || "http://localhost:3000";
  const teamsFile = await fetch(`${host}/api/teams`);
  const teamsFileJSON = await teamsFile.json();

  const calendarFile = await fetch(`${host}/api/matches`);
  const calendarFileJSON: Calendar = await calendarFile.json();

  const round = calendarFileJSON.rounds.find((round) => round.roundId == id);

  if (!round) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      teams: teamsFileJSON.teams,
      round,
    },
  };
}

export default RoundIdPage;
