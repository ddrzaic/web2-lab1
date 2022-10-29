import React, { useState } from "react";
import { Match, Team } from "../../helpers/Types";
import * as S from "./Match.styled";

export interface EditMatchProps {
  match: Match;
  teams: Team[];
  handleEditMatch: (match: Match) => void;
}

enum ChangeType {
  HOME_TEAM_SCORE = "HOME_TEAM_SCORE",
  AWAY_TEAM_SCORE = "AWAY_TEAM_SCORE",
  PLAYED = "PLAYED",
}

export const EditMatch: React.FC<EditMatchProps> = ({
  match,
  teams,
  handleEditMatch,
}) => {
  const teamsDict = Object.assign(
    {},
    ...teams.map((team) => ({ [team.id]: team.name }))
  );
  const homeTeamId = match.teams[0].id;
  const awayTeamId = match.teams[1].id;
  const [newInfo, setNewInfo] = useState<Match>(match);

  const handleChange = (changeType: ChangeType, value: number | boolean) => {
    switch (changeType) {
      case ChangeType.HOME_TEAM_SCORE:
        setNewInfo({
          ...newInfo,
          teams: [
            {
              ...newInfo.teams[0],
              score: value as number,
            },
            newInfo.teams[1],
          ],
        });
        break;
      case ChangeType.AWAY_TEAM_SCORE:
        setNewInfo({
          ...newInfo,
          teams: [
            newInfo.teams[0],
            {
              ...newInfo.teams[1],
              score: value as number,
            },
          ],
        });
        break;
      case ChangeType.PLAYED:
        setNewInfo({
          ...newInfo,
          played: value as boolean,
          teams: [
            {
              ...newInfo.teams[0],
              score: 0,
            },
            {
              ...newInfo.teams[1],
              score: 0,
            },
          ],
        });
        break;
    }
  };
  return (
    <S.Match>
      <S.Team>
        <p>Utakmica odigrana</p>
        <S.Checkbox
          type="checkbox"
          checked={newInfo.played}
          onChange={(e) => handleChange(ChangeType.PLAYED, e.target.checked)}
        />
      </S.Team>
      {newInfo.played && (
        <>
          <S.Team>
            <p>{teamsDict[homeTeamId]}</p>
            <S.Input
              type="number"
              value={newInfo.teams[0].score}
              onChange={(e) =>
                handleChange(
                  ChangeType.HOME_TEAM_SCORE,
                  parseInt(e.target.value)
                )
              }
            />
          </S.Team>
          <S.Team>
            <p>{teamsDict[awayTeamId]}</p>
            <S.Input
              type="number"
              value={newInfo.teams[1].score}
              onChange={(e) =>
                handleChange(
                  ChangeType.AWAY_TEAM_SCORE,
                  parseInt(e.target.value)
                )
              }
            />
          </S.Team>
        </>
      )}

      <S.Button
        onClick={() => {
          handleEditMatch(newInfo);
        }}
      >
        Spremi promjene
      </S.Button>
    </S.Match>
  );
};
