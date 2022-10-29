import React from "react";
import * as S from "./Modal.styled";

export interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  handleModalClose: () => void;
}

export const Modal = ({ children, isOpen, handleModalClose }: ModalProps) => {
  return (
    <S.Modal isOpen={isOpen}>
      <S.ModalContent>
        <S.CloseButton onClick={handleModalClose}>X</S.CloseButton>
        {children}
      </S.ModalContent>
    </S.Modal>
  );
};
