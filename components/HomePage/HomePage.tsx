import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import React from "react";
import { Team, Calendar } from "../../helpers/Types";
import { formatDate } from "../../helpers/utils";
import { ScoreBoard } from "../ScoreBoard/ScoreBoard";
import * as S from "./HomePage.styled";

export interface HomeProps {
  teams: Team[];
  calendar: Calendar;
}

export const HomePage: React.FC<HomeProps> = ({ teams, calendar }) => {
  const router = useRouter();
  const { isLoading } = useUser();

  const handleRouncClick = (round: number) => {
    router.push("/round/" + round);
  };
  const rounds = calendar.rounds.map((round) => (
    <S.Round
      key={round.roundId}
      onClick={() => {
        handleRouncClick(round.roundId);
      }}
    >
      {round.name}
      <S.RoundDates>
        {formatDate(round.startDate)} - {formatDate(round.endDate)}
      </S.RoundDates>
    </S.Round>
  ));
  return !isLoading ? (
    <S.HomePageContainer>
      <ScoreBoard teams={teams} calendar={calendar}></ScoreBoard>
      <S.RoundsWrapper>{rounds}</S.RoundsWrapper>
    </S.HomePageContainer>
  ) : null;
};
