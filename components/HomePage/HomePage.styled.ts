import styled from "styled-components";

export const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px auto;
  width: 100%;
  @media (max-width: 768px) {
    margin: 5px auto;
  }
`;

export const Round = styled.div`
  display: flex;
  padding: 15px 20px;
  width: 100%;
  border: 1px solid #d8d8d8;
  margin: 10px 5px;
  cursor: pointer;
  text-decoration: underline #d8d8d8;
  align-self: center;
  justify-content: space-between;
`;

export const RoundsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  color: #d8d8d8;
  width: 100%;
  max-width: 800px;
  margin: 20px 10px;
`;

export const RoundDates = styled.div`
  font-size: 14px;
  text-decoration: none !important;
  color: #d8d8d8;
`;
