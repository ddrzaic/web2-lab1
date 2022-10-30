import React, { useState } from "react";
import {
  addComment,
  deleteComment,
  getNewId,
  updateComment,
} from "../../helpers/commentsHelpers";
import { Comment } from "../../helpers/Types";
import { useUser } from "@auth0/nextjs-auth0";
import * as S from "./CommentSection.styled";
import { CommentComponent } from "../Comment/Comment";

export interface CommentSectionProps {
  comments: Comment[];
  roundId: number;
}

export const CommentSection: React.FC<CommentSectionProps> = ({
  comments,
  roundId,
}) => {
  const initialComments = comments ? comments : [];
  const [commentList, setCommentList] = useState<Comment[]>(initialComments);
  const { user, error, isLoading } = useUser();
  const isLoggedIn = user && !error && !isLoading;

  const handleAddComment = (comment: Comment) => {
    setCommentList([...commentList, comment]);
    addComment(comment, roundId);
  };

  const handleDeleteComment = (comment: Comment) => {
    const newCommentList = commentList.filter((c) => c.id !== comment.id);

    setCommentList(newCommentList);
    deleteComment(comment, roundId);
  };

  const handleUpdateComment = (comment: Comment) => {
    setCommentList(
      commentList.map((comment) =>
        comment.id === comment.id ? comment : comment
      )
    );
    updateComment(comment, roundId);
  };

  return (
    <S.CommentSectionContainer>
      <h3>Komentari:</h3>
      {commentList.map((comment) => (
        <CommentComponent
          key={comment.id}
          comment={comment}
          handleDeleteComment={handleDeleteComment}
          handleUpdateComment={handleUpdateComment}
          handleAddComment={handleAddComment}
          roundId={roundId}
        />
      ))}
      {isLoggedIn && (
        <CommentComponent
          newComment={true}
          handleAddComment={handleAddComment}
          handleDeleteComment={handleDeleteComment}
          handleUpdateComment={handleUpdateComment}
          roundId={roundId}
          newCommentId={getNewId(commentList)}
        />
      )}
    </S.CommentSectionContainer>
  );
};
