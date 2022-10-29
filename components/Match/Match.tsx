import { useUser } from "@auth0/nextjs-auth0";
import React, { useState } from "react";
import { Match, Team } from "../../helpers/Types";
import { formatDate, updateMatchInBackend } from "../../helpers/utils";
import { Modal } from "../Modal/Modal";
import { EditMatch } from "./EditMatch";
import * as S from "./Match.styled";

export interface MatchProps {
  roundId: number;
  match: Match;
  teams: Team[];
}

export const MatchComponent: React.FC<MatchProps> = ({
  match: matchFromBackend,
  teams,
  roundId,
}) => {
  const teamsDict = Object.assign(
    {},
    ...teams.map((team) => ({ [team.id]: team.name }))
  );
  const [match, setMatch] = useState<Match>(matchFromBackend);
  const homeTeamId = match.teams[0].id;
  const awayTeamId = match.teams[1].id;
  const { played } = match;
  const homeTeamScore = played ? match.teams[0].score : "-";
  const awayTeamScore = played ? match.teams[1].score : "-";

  const { user, error, isLoading } = useUser();

  const isAdmin = user?.email === "admin@test.com" && !error && !isLoading;

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEditMatch = (match: Match) => {
    updateMatchInBackend(match, roundId);
    setMatch(match);
    setIsEditModalOpen(false);
  };

  return (
    <S.Match>
      {isAdmin && (
        <S.EditButton
          onClick={() => {
            setIsEditModalOpen(true);
          }}
        >
          Edit
        </S.EditButton>
      )}
      <S.DateTime>
        <p>{formatDate(match.date)}</p>
        <p>{match.time}</p>
      </S.DateTime>
      <S.Team>
        <p>{teamsDict[homeTeamId]}</p>
        <p>{homeTeamScore}</p>
      </S.Team>

      <S.Team>
        <p>{teamsDict[awayTeamId]}</p>
        <p>{awayTeamScore}</p>
      </S.Team>
      {isEditModalOpen && (
        <Modal
          isOpen={isEditModalOpen}
          handleModalClose={() => {
            setIsEditModalOpen(false);
          }}
        >
          <EditMatch
            teams={teams}
            match={match}
            handleEditMatch={handleEditMatch}
          />
        </Modal>
      )}
    </S.Match>
  );
};
