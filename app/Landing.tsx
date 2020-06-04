/**
 * These enable formatting code using prettier
 *
 * @format
 */

import React, { useEffect } from "react";
import styled from "styled-components/native";
import { useHistory } from "react-router-native";

import AppContainer from "./AppContainer";
import PageTitle from "./PageTitle";

import useAccessToken from "./useAccessToken";

const HomePageContainer = styled(AppContainer)`
  justify-content: space-between;
`;

const ActionContainer = styled.View`
  justify-content: space-around;
  height: 80px;
`;

const StyledButton = styled.Button``;

function Landing() {
  const history = useHistory();
  const user = useAccessToken();

  useEffect(() => {
    if (user.token) {
      history.push("/home");
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
