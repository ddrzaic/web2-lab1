import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { promises as fs } from "fs";
import { Comment } from "../../../helpers/Types";
import { getSession } from "@auth0/nextjs-auth0";

interface ErrorResponseType {
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Comment[] | ErrorResponseType>
) {
  const session = getSession(req, res);
  const dbDirectory = path.join(process.cwd(), "db");
  const fileContents = await fs.readFile(
    dbDirectory + "/comments.json",
    "utf8"
  );
  const roundId = req.query.id as string;
  const { comment } = req.body;
  const author = comment?.author;

  switch (req.method) {
    case "GET":
      const allComments = JSON.parse(fileContents).comments;
      const comments = allComments[roundId];
      if (!comments) {
        res.status(200).json([]);
        break;
      }
      res.status(200).json(comments);
      break;
    case "POST":
      if (session?.user.email !== author) {
        res.status(403).json({ message: "Not authorized" });
        break;
      }
      let commentsFile = JSON.parse(fileContents);

      commentsFile.comments[roundId].push(comment);

      await fs.writeFile(
        dbDirectory + "/comments.json",
        JSON.stringify(commentsFile)
      );

      res.status(200).json(commentsFile);
      break;

    case "DELETE":
      const isAdmin = session?.user.email === "admin@test.com";
      if (session?.user.email !== author && !isAdmin) {
        res.status(403).json({ message: "Not authorized" });
      }
      let commentsFileDelete = JSON.parse(fileContents);
      commentsFileDelete.comments[roundId] = commentsFileDelete.comments[
        roundId
      ].filter((c: Comment) => c.id !== comment.id);

      await fs.writeFile(
        dbDirectory + "/comments.json",
        JSON.stringify(commentsFileDelete)
      );

      res.status(200).json(commentsFileDelete);
      break;

    case "PATCH":
      if (session?.user.email !== author) {
        res.status(403).json({ message: "Not authorized" });
      }
      let commentsFileUpdate = JSON.parse(fileContents);
      commentsFileUpdate.comments[roundId] = commentsFileUpdate.comments[
        roundId
      ].map((c: Comment) => {
        if (c.id === comment.id) {
          c = comment;
        }
        return c;
      });

      await fs.writeFile(
        dbDirectory + "/comments.json",
        JSON.stringify(commentsFileUpdate)
      );
      res.status(200).json(commentsFileUpdate);
      break;
  }
}
