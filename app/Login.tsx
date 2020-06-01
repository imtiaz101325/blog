/**
 * These enable formatting code using prettier
 *
 * @format
 */

import React, { useState } from "react";
import styled from "styled-components/native";
import { useHistory } from "react-router-native";
import AsyncStorage from "@react-native-community/async-storage";
import { Button } from "react-native";

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
  color: ${lightShade};
`;

const LoginContent = styled.View`
  margin-top: 8px;
  padding: 16px;
  background-color: #271d35;
`;

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://0.0.0.0:8000/api/v1/auth", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (response.ok) {
        const { token } = await response.json();
        await AsyncStorage.setItem("@access_token", token);

        history.push("/users");
      }
    } catch (err) {
      console.log(err);
    }
  };

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
      <Button title="Login" onPress={handleLogin} />
    </LoginContainer>
  );
}

export default App;
