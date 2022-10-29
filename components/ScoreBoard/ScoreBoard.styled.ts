import styled from "styled-components";

export const ScoreBoard = styled.div`
  color: #d8d8d8;
  display: flex;
  width: 100%;
  flex-direction: column;
  margin: 20px auto;
  max-width: 800px;
`;

export const ScoreBoardContainer = styled.table`
  margin: 20px auto;
  width: 100%;
  max-width: 800px;
  border: 2px solid #16213e;
  border-collapse: collapse;
  border-spacing: 0;
  border-radius: 20px;
  background-color: #182747;

  tbody {
    text-align: center;
  }
  th {
    padding: 10px;
  }
  @media (max-width: 768px) {
    font-size: 0.8rem;
    margin: 5px auto;
  }
`;

export const ListItem = styled.tr`
  padding: 30px 20px;
  @media (max-width: 768px) {
    padding: 10px 5px;
  }
`;

export const TableItem = styled.td`
  padding: 7px 10px;
  border: 3px solid #16213e;
  @media (max-width: 768px) {
    padding: 5px 5px;
  }
`;
