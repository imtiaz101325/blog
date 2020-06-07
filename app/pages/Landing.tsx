/**
 * These enable formatting code using prettier
 *
 * @format
 */

import React, { useEffect } from "react";
import styled from "styled-components/native";
import { useHistory } from "react-router-native";

import AppContainer from "../components/AppContainer";
import PageTitle from "../components/PageTitle";

const HomePageContainer = styled(AppContainer)`
  justify-content: space-between;
`;

const ActionContainer = styled.View`
  justify-content: space-around;
  height: 80px;
`;

const StyledButton = styled.Button``;

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
        <StyledButton title="Login" onPress={() => history.push("/login")} />
        <StyledButton title="Sign Up" onPress={() => history.push("/signup")} />
      </ActionContainer>
    </HomePageContainer>
  );
}

export default Landing;
