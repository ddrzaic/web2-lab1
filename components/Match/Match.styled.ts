import styled from "styled-components";

export const Match = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #182747;
  margin: 5px auto;
  border: 1px solid #d8d8d8;
  padding: 8px 30px;
  width: 100%;
`;

export const Team = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  p {
    font-weight: 500;
  }
`;

export const EditButton = styled.p`
  color: #d8d8d8;
  cursor: pointer;
  text-decoration: underline #d8d8d8;
  text-align: end;
  font-size: 14px;
  margin: 5px -15px 5px 0;
`;

export const Checkbox = styled.input`
  width: 16px;
  height: 16px;
  align-self: center;
  cursor: pointer;
`;

export const Button = styled.button`
  background-color: #182747;
  color: #d8d8d8;
  height: 60px;
  font-size: 20px;
  font-weight: 500;
  margin: 20px auto;
  border: 1px solid #d8d8d8;
  padding: 0 30px;
  cursor: pointer;
`;

export const Input = styled.input`
  padding: 10px;
  margin: 5px 0;
  width: 100px;
`;

export const DateTime = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;

  font-size: 14px;
  p {
    margin: 0 10px 0 0;
  }
`;
