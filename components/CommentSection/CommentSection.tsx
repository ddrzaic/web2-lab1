import React, { useState } from "react";
import {
  addComment,
  deleteComment,
  getNewId,
  sortComments,
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
  const initialComments = comments ? sortComments(comments) : [];
  const [commentList, setCommentList] = useState<Comment[]>(initialComments);
  const { user, error, isLoading } = useUser();
  const isLoggedIn = user && !error && !isLoading;
  const [editCommentId, setEditCommentId] = useState<number | null>(null);

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
    const newCommentList = sortComments(
      commentList.map((c) => (c.id === comment.id ? comment : c))
    );
    setCommentList(newCommentList);
    updateComment(comment, roundId);
    setEditCommentId(null);
  };

  const handleStartEditing = (comment: Comment) => {
    setEditCommentId(comment.id);
  };

  const handleStopEditing = () => {
    setEditCommentId(null);
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
          handleStartEditing={handleStartEditing}
          roundId={roundId}
          isNewComment={comment.id === editCommentId}
          newCommentId={getNewId(commentList)}
          handleStopEditing={handleStopEditing}
        />
      ))}
      {isLoggedIn && (
        <CommentComponent
          isNewComment={true}
          handleAddComment={handleAddComment}
          handleDeleteComment={handleDeleteComment}
          handleUpdateComment={handleUpdateComment}
          handleStartEditing={handleStartEditing}
          handleStopEditing={handleStopEditing}
          roundId={roundId}
          newCommentId={getNewId(commentList)}
        />
      )}
    </S.CommentSectionContainer>
  );
};
