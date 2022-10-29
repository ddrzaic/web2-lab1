// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { promises as fs } from "fs";
import { Team } from "../../helpers/Types";

type Data = {
  teams: Team[];
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const dbDirectory = path.join(process.cwd(), "db");
  const fileContents = await fs.readFile(dbDirectory + "/teams.json", "utf8");

  switch (req.method) {
    case "GET":
      res.status(200).json(JSON.parse(fileContents));
      break;
    case "POST":
      res.status(500).json({ teams: [], error: "Not implemented" });
  }
}
