import React, { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import type { Comment } from "../../helpers/Types";
import * as S from "./Comment.styled";
import { NewComment } from "./NewComment";
import { formatDate } from "../../helpers/utils";
import { Modal } from "../Modal/Modal";

export interface CommentProps {
  comment?: Comment;
  handleAddComment: (comment: Comment) => void;
  handleDeleteComment: (comment: Comment) => void;
  handleUpdateComment: (comment: Comment) => void;
  handleStartEditing: (comment: Comment) => void;
  handleStopEditing: () => void;
  isNewComment?: boolean;
  newCommentId?: number;
  roundId: number;
}

export const CommentComponent: React.FC<CommentProps> = ({
  comment,
  handleAddComment,
  handleDeleteComment,
  handleUpdateComment,
  handleStartEditing,
  handleStopEditing,
  isNewComment,
  newCommentId,
  roundId,
}) => {
  const { user, error, isLoading } = useUser();
  const [showModal, setShowModal] = useState(false);
  const isAdmin = user?.email === "admin@test.com" && !error && !isLoading;
  const isAuthor = user?.email === comment?.author && !error && !isLoading;

  if (isNewComment && (!handleAddComment || !newCommentId)) {
    throw new Error(
      "handleAddComment and newCommentId are required for newComment"
    );
  }

  if (
    !isNewComment &&
    (!comment || !handleDeleteComment || !handleUpdateComment)
  ) {
    throw new Error(
      "comment, handleDeleteComment and handleUpdateComment are required for existing comment"
    );
  }

  return isNewComment ? (
    <NewComment
      handleAddComment={handleAddComment}
      handleEditComment={handleUpdateComment}
      handleStopEditing={handleStopEditing}
      newCommentId={newCommentId!}
      roundId={roundId}
      comment={comment}
    />
  ) : (
    <S.Comment>
      <S.CommentHeader>
        <S.CommentDetails>
          <p>{comment?.author}</p>
          <p>{formatDate(comment?.date || "", true)}</p>
        </S.CommentDetails>
        <S.CommentActions>
          {(isAdmin || isAuthor) && (
            <S.EditButton
              onClick={() => {
                setShowModal(true);
              }}
            >
              Delete
            </S.EditButton>
          )}
          {isAuthor && (
            <S.EditButton
              onClick={() => {
                handleStartEditing(comment!);
              }}
            >
              Edit
            </S.EditButton>
          )}
        </S.CommentActions>
      </S.CommentHeader>

      <S.CommentText>{comment?.text}</S.CommentText>
      <Modal
        isOpen={showModal}
        handleModalClose={() => {
          setShowModal(false);
        }}
      >
        <S.ModalContentWrapper>
          <p>Jeste li sigurni da želite obrisati komentar?</p>
          <S.ButtonsWrapper>
            <S.Button
              onClick={() => {
                handleDeleteComment(comment!);
                setShowModal(false);
              }}
            >
              Da
            </S.Button>
            <S.Button
              onClick={() => {
                setShowModal(false);
              }}
            >
              Ne
            </S.Button>
          </S.ButtonsWrapper>
        </S.ModalContentWrapper>
      </Modal>
    </S.Comment>
  );
};
