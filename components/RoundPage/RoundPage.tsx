import { useRouter } from "next/router";
import React from "react";
import { Round, Team } from "../../helpers/Types";
import { MatchComponent } from "../Match/Match";
import * as S from "./RoundPage.styled";

export interface RoundPageProps {
  round: Round;
  teams: Team[];
}

export const RoundPage: React.FC<RoundPageProps> = ({ round, teams }) => {
  const router = useRouter();

  const backButtonHandler = () => {
    router.back();
  };
  return (
    <S.RoundContainer>
      <S.BackButton onClick={backButtonHandler}>Natrag</S.BackButton>
      <S.RoundTitle>{round.name}</S.RoundTitle>
      {round.matches.map((match) => (
        <MatchComponent
          key={match.id}
          match={match}
          teams={teams}
          roundId={round.roundId}
        />
      ))}
    </S.RoundContainer>
  );
};
