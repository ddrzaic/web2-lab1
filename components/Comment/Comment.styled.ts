import styled from "styled-components";

export const Comment = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #d8d8d8;
  margin: 5px auto;
  width: 100%;
  background-color: #182747;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
`;

export const CommentInput = styled.textarea`
  caret-color: white;
  height: 80px;
  margin: 10px;
  border: 1px solid #d8d8d8;
  resize: none;
  background-color: #16213e;
  padding: 10px;
  color: #d8d8d8;
`;

export const Button = styled.button`
  background-color: #182747;
  color: #d8d8d8;
  height: 30px;
  font-size: 20px;
  font-weight: 500;
  margin: 20px auto;
  border: 1px solid #d8d8d8;
  padding: 0 30px;
  cursor: pointer;
  align-self: start;
`;

export const CommentDetails = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 10px 10px;
  font-size: 14px;
  font-weight: 500;
  color: #d8d8d8;
  p {
    margin: 0;
  }
`;

export const EditButton = styled.p`
  color: #d8d8d8;
  cursor: pointer;
  text-decoration: underline #d8d8d8;
  text-align: end;
  font-size: 14px;
  margin: 5px 5px;
`;

export const CommentText = styled.p`
  margin: 10px 10px;
  font-size: 14px;
  border: 1px solid #d8d8d8;
  padding: 10px;
`;

export const CommentHeader = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  padding: 5px 10px 0 0;
`;

export const CommentActions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
