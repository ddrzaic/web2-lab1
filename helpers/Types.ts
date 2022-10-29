export type Team = {
  id: number;
  name: string;
};

export type Match = {
  id: number;
  played: boolean;
  date: string;
  time: string;
  teams: [{ id: number; score: number }, { id: number; score: number }];
};

export type Round = {
  name: string;
  startDate: string;
  endDate: string;
  roundId: number;
  matches: Match[];
};

export type Calendar = {
  rounds: Round[];
};

export type TeamStats = {
  id: number;
  name: string;
  gamesPlayed: number;
  gamesWon: number;
  gamesLost: number;
  gamesDrawn: number;
  points: number;
  goalDifference: number;
};
