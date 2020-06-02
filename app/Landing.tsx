/**
 * These enable formatting code using prettier
 *
 * @format
 */

import React from "react";
import styled from "styled-components/native";
import { useHistory } from "react-router-native";

const lightShade = "#f4f4f4";
const darkShade = "#271d35";

const HomePageContainer = styled.View`
  padding: 16px;
  background-color: ${lightShade};
  height: 100%;
  justify-content: space-between;
`;

const HomePageTitle = styled.Text`
  font-size: 32px;
  text-align: center;
  font-weight: bold;
  color: ${darkShade};
`;

const ActionContainer = styled.View`
  justify-content: space-around;
  height: 80px;
`;

const StyledButton = styled.Button`
`;

function Landing() {
  const history = useHistory();

  return (
    <HomePageContainer>
      <HomePageTitle>Blog</HomePageTitle>
      <ActionContainer>
        <StyledButton title="Login" onPress={() => history.push("/login")} />
        <StyledButton title="Sign Up" onPress={() => history.push("/signup")} />
      </ActionContainer>
    </HomePageContainer>
  );
}

export default Landing;
