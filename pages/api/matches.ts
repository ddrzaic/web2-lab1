// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { promises as fs } from "fs";

type Data = {
  match: string;
};

type Match = {
  id: number;
  played: boolean;
  teams: [{ id: string; score: number }, { id: string; score: number }];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const dbDirectory = path.join(process.cwd(), "db");
  const fileContents = await fs.readFile(dbDirectory + "/matches.json", "utf8");
  switch (req.method) {
    case "GET":
      res.status(200).json(JSON.parse(fileContents));
      break;
    case "POST":
      const { match } = req.body;
      console.log(match);
      const { id, round } = match;
      let matches = JSON.parse(fileContents);
      const updatedMatches = matches["rounds"][round]["matches"].map(
        (m: Match) => {
          const team1 = m["teams"][0];
          const team2 = m["teams"][1];

          if (m.id === id) {
            team1["score"] = match["score"][team1["id"]];
            team2["score"] = match["score"][team2["id"]];
            return {
              ...m,
              teams: [team1, team2],
            };
          }
          return m;
        }
      );
      matches["rounds"][round]["matches"] = updatedMatches;
      await fs.writeFile(
        dbDirectory + "/matches.json",
        JSON.stringify(matches)
      );

      res.status(200).json(matches);
      break;
  }
}
