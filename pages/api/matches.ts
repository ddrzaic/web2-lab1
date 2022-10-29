import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { promises as fs } from "fs";
import { Match, Calendar } from "../../helpers/Types";
import { getSession } from "@auth0/nextjs-auth0";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Calendar>
) {
  const session = getSession(req, res);
  const dbDirectory = path.join(process.cwd(), "db");
  const fileContents = await fs.readFile(dbDirectory + "/matches.json", "utf8");
  switch (req.method) {
    case "GET":
      res.status(200).json(JSON.parse(fileContents));
      break;
    case "POST":
      if (session?.user.email !== "admin@test.com") {
        res.status(403).json({ message: "Not authorized" });
        break;
      }
      const { match, roundId } = req.body;
      const { id, played, teams } = match as Match;
      const payloadTeamId1 = teams[0].id;
      const payloadTeamId2 = teams[1].id;
      let calendar: Calendar = JSON.parse(fileContents);
      const round = calendar.rounds.find((round) => round.roundId === roundId);
      if (round) {
        const updatedMatches = round["matches"].map((m: Match) => {
          const team1 = m.teams[0];
          const team2 = m.teams[1];

          if (m.id === id) {
            m.played = played;
            if (payloadTeamId1 == team1.id && payloadTeamId2 == team2.id) {
              team1.score = teams[0].score;
              team2.score = teams[1].score;
              if (!played) {
                team1.score = 0;
                team2.score = 0;
              }
            }
            if (payloadTeamId1 == team2.id && payloadTeamId2 == team1.id) {
              team1.score = teams[1].score;
              team2.score = teams[0].score;
              if (!played) {
                team1.score = 0;
                team2.score = 0;
              }
            }
          }
          return m;
        });

        round["matches"] = updatedMatches;

        calendar.rounds = calendar.rounds.map((r) => {
          if (r.roundId === roundId) {
            r = round;
          }
          return r;
        });

        await fs.writeFile(
          dbDirectory + "/matches.json",
          JSON.stringify(calendar)
        );

        res.status(200).json(calendar);
      }

      break;
  }
}
