import React from "react";
import styled from "styled-components/native";
import { useHistory } from "react-router-native";
import { Button } from "@ui-kitten/components";

import AppContainer from "../components/AppContainer";
import PageTitle from "../components/PageTitle";

const HomePageContainer = styled(AppContainer)`
  height: 90%;
  justify-content: space-between;
`;

const ActionContainer = styled.View`
  justify-content: space-around;
  height: 110px;
`;

function Landing() {
  const history = useHistory();

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
