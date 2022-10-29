import React, { useState, useEffect } from "react";
import { Team, Calendar } from "../../helpers/Types";
import { calculateTeamStats, sortTeamStats } from "../../helpers/utils";
import useWindowDimensions from "../../hooks/useWindowSize";
import * as S from "./ScoreBoard.styled";

export interface ScoreBoardProps {
  teams: Team[];
  calendar: Calendar;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({
  teams,
  calendar,
}: ScoreBoardProps) => {
  const teamsStats = sortTeamStats(calculateTeamStats(calendar, teams));
  const { width } = useWindowDimensions();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (width && width < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [width]);
  return (
    <S.ScoreBoard>
      <h3> Poredak</h3>
      <S.ScoreBoardContainer>
        <tbody>
          <S.ListItem>
            <th>Klub</th>
            <th>{isMobile ? "P" : "Odigrano"}</th>
            <th>{isMobile ? "W" : "Pobjeda"}</th>
            <th>{isMobile ? "T" : "Nerješeno"}</th>
            <th>{isMobile ? "L" : "Porazi"}</th>
            <th>{isMobile ? "GD" : "Gol razlika"}</th>
            <th>Bodovi</th>
          </S.ListItem>
          {teamsStats.map((team) => (
            <S.ListItem key={team.id}>
              <S.TableItem>{team.name}</S.TableItem>
              <S.TableItem>{team.gamesPlayed}</S.TableItem>
              <S.TableItem>{team.gamesWon}</S.TableItem>
              <S.TableItem>{team.gamesDrawn}</S.TableItem>
              <S.TableItem>{team.gamesLost}</S.TableItem>
              <S.TableItem>{team.goalDifference}</S.TableItem>
              <S.TableItem>{team.points}</S.TableItem>
            </S.ListItem>
          ))}
        </tbody>
      </S.ScoreBoardContainer>
    </S.ScoreBoard>
  );
};
