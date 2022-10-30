import { Calendar, Match, Team, TeamStats, Comment } from "./Types";

export const calculateTeamStats = (
  calendar: Calendar,
  teams: Team[]
): TeamStats[] => {
  const teamStats: TeamStats[] = teams.map((team) => {
    return {
      id: team.id,
      name: team.name,
      gamesPlayed: 0,
      gamesWon: 0,
      gamesLost: 0,
      gamesDrawn: 0,
      points: 0,
      goalDifference: 0,
    };
  });

  calendar.rounds.forEach((round) => {
    round.matches.forEach((match) => {
      const team1 = match.teams[0];
      const team2 = match.teams[1];

      if (match.played) {
        const team1Stats = teamStats.find((team) => team.id === team1.id);
        const team2Stats = teamStats.find((team) => team.id === team2.id);

        if (team1Stats && team2Stats) {
          team1Stats.gamesPlayed++;
          team2Stats.gamesPlayed++;

          if (team1.score > team2.score) {
            team1Stats.gamesWon++;
            team2Stats.gamesLost++;
            team1Stats.points += 3;
          }

          if (team1.score < team2.score) {
            team1Stats.gamesLost++;
            team2Stats.gamesWon++;
            team2Stats.points += 3;
          }

          if (team1.score === team2.score) {
            team1Stats.gamesDrawn++;
            team2Stats.gamesDrawn++;
            team1Stats.points += 1;
            team2Stats.points += 1;
          }

          team1Stats.goalDifference += team1.score - team2.score;
          team2Stats.goalDifference += team2.score - team1.score;
        }
      }
    });
  });

  return teamStats;
};

export const sortTeamStats = (teamStats: TeamStats[]): TeamStats[] => {
  return teamStats.sort((a, b) => {
    if (a.points > b.points) {
      return -1;
    }
    if (a.points < b.points) {
      return 1;
    }
    if (a.points === b.points) {
      if (a.goalDifference > b.goalDifference) {
        return -1;
      }
      if (a.goalDifference < b.goalDifference) {
        return 1;
      }
      if (a.goalDifference === b.goalDifference) {
        if (a.gamesWon > b.gamesWon) {
          return -1;
        }
        if (a.gamesWon < b.gamesWon) {
          return 1;
        }
        if (a.gamesWon === b.gamesWon) {
          return 0;
        }
      }
    }
    return 0;
  });
};

export const updateMatchInBackend = (match: Match, roundId: number) => {
  const payload = {
    roundId,
    match,
  };

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  };
  const host = process.env.APP_BASE_URL || "http://localhost:3000";

  fetch(`${host}/api/matches/`, requestOptions).then((response) =>
    response.json()
  );
};

export const formatDate = (date: string, isWithTime?: boolean) => {
  const dateObject = new Date(date);

  const optionsWithTime = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  } as const;

  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  } as const;

  return dateObject.toLocaleDateString(
    "hr-HR",
    isWithTime ? optionsWithTime : options
  );
};
