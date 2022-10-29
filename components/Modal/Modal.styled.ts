import styled from "styled-components";

export interface ModalProps {
  isOpen: boolean;
}
export const Modal = styled.div<ModalProps>`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(5, 10, 20, 0.8);
`;

export const ModalContent = styled.div`
  background-color: #182747;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  width: 80%; /* Could be more or less, depending on screen size */
  min-height: 300px;
  align-self: center;
  display: flex;
  flex-direction: column;
  max-width: 800px;
`;

export const CloseButton = styled.div`
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
  align-self: end;
  margin: 10px 10px 20px 0;
  width: min-content;
`;
