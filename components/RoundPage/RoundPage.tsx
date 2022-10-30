import { useRouter } from "next/router";
import React from "react";
import { Round, Team, Comment } from "../../helpers/Types";
import { CommentSection } from "../CommentSection/CommentSection";
import { MatchComponent } from "../Match/Match";
import * as S from "./RoundPage.styled";
import { useUser } from "@auth0/nextjs-auth0";

export interface RoundPageProps {
  round: Round;
  teams: Team[];
  comments: Comment[];
}

export const RoundPage: React.FC<RoundPageProps> = ({
  round,
  teams,
  comments,
}) => {
  const router = useRouter();
  const { roundId } = round;
  const backButtonHandler = () => {
    router.back();
  };
  const { isLoading } = useUser();
  return !isLoading ? (
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
      <CommentSection comments={comments} roundId={roundId} />
    </S.RoundContainer>
  ) : null;
};
