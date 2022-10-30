import React from "react";
import { RoundPage } from "../../components/RoundPage/RoundPage";
import { Team, Round, Calendar, Comment } from "../../helpers/Types";

export interface RoundProps {
  teams: Team[];
  round: Round;
  comments: Comment[];
}

export const RoundIdPage: React.FC<RoundProps> = ({
  teams,
  round,
  comments,
}) => {
  return <RoundPage round={round} teams={teams} comments={comments} />;
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

  const commentsFile = await fetch(`${host}/api/comments/${id}`);
  const comments = await commentsFile.json();

  return {
    props: {
      teams: teamsFileJSON.teams,
      round,
      comments,
    },
  };
}

export default RoundIdPage;
