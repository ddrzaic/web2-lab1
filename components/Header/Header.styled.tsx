import styled, { css } from "styled-components";

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 20px;
  align-items: center;
  color: #d8d8d8;
  background-color: #0f3460;
`;

export const Login = styled.a`
  font-size: 1rem;
  text-decoration: underline;
`;

export const User = styled.div`
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  p {
    margin: 0 0 8px;
  }
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  line-height: 1.5rem;
  margin: 0;
`;
