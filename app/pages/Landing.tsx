/**
 * These enable formatting code using prettier
 *
 * @format
 */

import React, { useEffect } from "react";
import styled from "styled-components/native";
import { useHistory } from "react-router-native";
import { Button } from "@ui-kitten/components";

import AppContainer from "../components/AppContainer";
import PageTitle from "../components/PageTitle";

import styles from "../styles";

const HomePageContainer = styled(AppContainer)`
  height: 90%;
  justify-content: space-between;
`;

const ActionContainer = styled.View`
  justify-content: space-around;
  height: 110px;
`;

function Landing({
  user,
}: {
  user: {
    id: number;
    username: string;
    email: string;
    role: string;
    expiresAt: string;
    iat: string;
    token: string;
  };
}) {
  const history = useHistory();

  useEffect(() => {
    if (user.token) {
      if (user.role === "admin") {
        history.push("/users");
      } else {
        history.push("/home");
      }
    }
  }, [user]);

  return (
    <HomePageContainer>
      <PageTitle>Blog</PageTitle>
      <ActionContainer>
        <Button onPress={() => history.push("/login")}>Login</Button>
        <Button onPress={() => history.push("/sign-up")}>Sign Up</Button>
      </ActionContainer>
    </HomePageContainer>
  );
}

export default Landing;
