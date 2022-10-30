import React, { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import type { Comment } from "../../helpers/Types";
import * as S from "./Comment.styled";

export interface NewCommentProps {
  handleAddComment: (comment: Comment) => void;
  handleEditComment: (comment: Comment) => void;
  handleStopEditing: () => void;
  newCommentId: number;
  roundId: number;
  comment?: Comment;
}

export const NewComment: React.FC<NewCommentProps> = ({
  handleAddComment,
  handleEditComment,
  handleStopEditing,
  newCommentId,
  roundId,
  comment,
}) => {
  const [commentText, setCommentText] = useState<string>(comment?.text || "");
  const { user } = useUser();

  const isEdit = comment !== undefined;

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
    if (isEdit) {
      newComment.id = comment?.id ?? newCommentId;
      handleEditComment(newComment);
    } else {
      handleAddComment(newComment);
    }
    setCommentText("");
  };

  return (
    <S.Comment>
      <S.CommentInput
        value={commentText}
        onChange={handleCommentChange}
        placeholder="Unesite komentar..."
        autoFocus={isEdit}
      ></S.CommentInput>
      <S.ButtonsWrapper>
        <S.Button onClick={handleAddCommentClick}>
          {isEdit ? "Spremi promjene" : "Dodaj komentar"}
        </S.Button>
        {isEdit && (
          <S.Button
            onClick={() => {
              handleStopEditing();
            }}
          >
            Odustani
          </S.Button>
        )}
      </S.ButtonsWrapper>
    </S.Comment>
  );
};
