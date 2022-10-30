import React from "react";
import { useUser } from "@auth0/nextjs-auth0";
import type { Comment } from "../../helpers/Types";
import * as S from "./Comment.styled";
import { NewComment } from "./NewComment";
import { formatDate } from "../../helpers/utils";

export interface CommentProps {
  comment?: Comment;
  handleAddComment: (comment: Comment) => void;
  handleDeleteComment: (comment: Comment) => void;
  handleUpdateComment: (comment: Comment) => void;
  newComment?: boolean;
  newCommentId?: number;
  roundId: number;
}

export const CommentComponent: React.FC<CommentProps> = ({
  comment,
  handleAddComment,
  handleDeleteComment,
  handleUpdateComment,
  newComment,
  newCommentId,
  roundId,
}) => {
  const { user, error, isLoading } = useUser();

  const isAdmin = user?.email === "admin@test.com" && !error && !isLoading;
  const isAuthor = user?.email === comment?.author && !error && !isLoading;

  if (newComment && (!handleAddComment || !newCommentId)) {
    throw new Error(
      "handleAddComment and newCommentId are required for newComment"
    );
  }

  if (
    !newComment &&
    (!comment || !handleDeleteComment || !handleUpdateComment)
  ) {
    throw new Error(
      "comment, handleDeleteComment and handleUpdateComment are required for existing comment"
    );
  }

  return newComment ? (
    <NewComment
      handleAddComment={handleAddComment}
      newCommentId={newCommentId!}
      roundId={roundId}
    />
  ) : (
    <S.Comment>
      <S.CommentHeader>
        <S.CommentDetails>
          <p>{comment?.author}</p>
          <p>{formatDate(comment?.date || "")}</p>
        </S.CommentDetails>
        <S.CommentActions>
          {(isAdmin || isAuthor) && (
            <S.EditButton
              onClick={() => {
                handleDeleteComment(comment!);
              }}
            >
              Delete
            </S.EditButton>
          )}
          {isAuthor && <S.EditButton>Edit</S.EditButton>}
        </S.CommentActions>
      </S.CommentHeader>

      <S.CommentText>{comment?.text}</S.CommentText>
    </S.Comment>
  );
};
