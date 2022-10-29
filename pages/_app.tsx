import "../styles/globals.css";
import type { AppProps } from "next/app";
import { UserProvider } from "@auth0/nextjs-auth0";
import { Header } from "../components/Header/Header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Header title="HNL Rezultati"></Header>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
