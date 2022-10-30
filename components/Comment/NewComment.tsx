import React, { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import type { Comment } from "../../helpers/Types";
import * as S from "./Comment.styled";

export interface NewCommentProps {
  handleAddComment: (comment: Comment) => void;
  newCommentId: number;
  roundId: number;
}

export const NewComment: React.FC<NewCommentProps> = ({
  handleAddComment,
  newCommentId,
  roundId,
}) => {
  const [commentText, setCommentText] = useState<string>("");
  const { user } = useUser();

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setCommentText(event.target.value);
  };

  const handleAddCommentClick = () => {
    const newComment: Comment = {
      id: newCommentId,
      roundId: roundId,
      text: commentText,
      author: user?.email || "",
      date: new Date().toISOString(),
      time: new Date().toLocaleTimeString(),
    };
    handleAddComment(newComment);
    setCommentText("");
  };

  return (
    <S.Comment>
      <S.CommentInput
        value={commentText}
        onChange={handleCommentChange}
      ></S.CommentInput>
      <S.Button onClick={handleAddCommentClick}>Dodaj komentar</S.Button>
    </S.Comment>
  );
};
