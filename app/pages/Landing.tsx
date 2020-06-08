/**
 * These enable formatting code using prettier
 *
 * @format
 */

import React, { useEffect } from "react";
import styled from "styled-components/native";
import { useHistory } from "react-router-native";
import { Button } from "react-native";

import AppContainer from "../components/AppContainer";
import PageTitle from "../components/PageTitle";

import styles from "../styles";

const HomePageContainer = styled(AppContainer)`
  height: 90%;
  justify-content: space-between;
`;

const ActionContainer = styled.View`
  justify-content: space-around;
  height: 90px;
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
        <Button title="Login" onPress={() => history.push("/login")} color={ styles.darkShade } />
        <Button title="Sign Up" onPress={() => history.push("/signup")} color={ styles.darkShade } />
      </ActionContainer>
    </HomePageContainer>
  );
}

export default Landing;
