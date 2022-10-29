/* eslint-disable @next/next/no-html-link-for-pages */
import react, { useEffect } from "react";
import * as S from "./Header.styled";
import { useUser } from "@auth0/nextjs-auth0";

export interface HeaderProps {
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  const { user, error, isLoading } = useUser();

  return (
    <S.Header>
      <S.Title>{title}</S.Title>
      {!user && !isLoading && !error && (
        <S.Login href="/api/auth/login">Log in</S.Login>
      )}
      {user && !isLoading && !error && (
        <S.User>
          <p>Hello, {user.name}</p>
          <S.Login href="/api/auth/logout">Log out</S.Login>
        </S.User>
      )}
      {isLoading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
    </S.Header>
  );
};
