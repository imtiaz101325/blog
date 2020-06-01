/**
 * These enable formatting code using prettier
 *
 * @format
 */

import React, { useState } from "react";
import styled from "styled-components/native";

const lightShade = "#f4f4f4";
const darkShade = "#271d35";

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
    <LoginContainer>
      <LoginTitle>Login</LoginTitle>
      <LoginContent>
        <LightText>Username</LightText>
        <LoginInput
          value={username}
          onChangeText={(value) => setUsername(value)}
        />
        <LightText>password</LightText>
        <LoginInput
          value={password}
          onChangeText={(value) => setPassword(value)}
        />
      </LoginContent>
    </LoginContainer>
  );
}

export default App;
