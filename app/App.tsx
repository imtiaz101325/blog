/**
 * These enable formatting code using prettier
 *
 * @format
 */

import React, {useState} from "react";
import styled from "styled-components/native";
import {TextInput, View, Text} from "react-native";

const lightShade = "#f4f4f4";
const darkShade = "#271d35";

const HomePageContainer = styled.View`
  padding: 16px;
  background-color: #f4f4f4;
`;

const HomePageTitle = styled.Text`
  font-size: 32px;
  text-align: center;
  font-weight: bold;
`;

const LoginContainer = styled.View`
  margin: 2px;
`;

const LightText = styled.Text`
  color: ${lightShade};
`;

const DarkText = styled.Text`
  color: ${darkShade};
`;

const LoginTitle = styled(DarkText)`
  font-size: 24px;
`;

const LoginInput = styled.TextInput`
  border: 2px solid #f4f4f4;
  border-top-width: 0;
  border-left-width: 0;
  border-right-width: 0;
`;

const LoginContent = styled.View`
  margin-top: 8px;
  padding: 16px;
  background-color: #271d35;
`;
function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <HomePageContainer>
      <HomePageTitle>Blog</HomePageTitle>
      <LoginContainer>
        <LoginTitle>Login</LoginTitle>
        <LoginContent>
          <LightText>Username</LightText>
          <LoginInput value={ username } onChangeText={ value => setUsername(value) } />
          <LightText>password</LightText>
          <LoginInput value={ password } onChangeText={ value => setPassword(value) } />
        </LoginContent>
      </LoginContainer>
    </HomePageContainer>
  );
}

export default App;
