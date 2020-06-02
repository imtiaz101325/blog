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
  padding: 16px;
  background-color: ${lightShade};
  height: 100%;
  justify-content: space-between;
`;

const LightText = styled.Text`
  color: ${lightShade};
`;

const DarkText = styled.Text`
  color: ${darkShade};
`;

const LoginTitle = styled(DarkText)`
  font-size: 32px;
  text-align: center;
  font-weight: bold;
  color: ${darkShade};
`;

const LoginInput = styled.TextInput`
  border: 2px solid ${darkShade};
  border-top-width: 0;
  border-left-width: 0;
  border-right-width: 0;
  color: ${darkShade};
`;

const LoginContent = styled.View`
  margin-top: 8px;
  padding: 16px;
  height: 300px;
  justify-content: space-around;
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
        <DarkText>Username</DarkText>
        <LoginInput
          value={username}
          onChangeText={(value) => setUsername(value)}
        />
        <DarkText>password</DarkText>
        <LoginInput
          value={password}
          onChangeText={(value) => setPassword(value)}
        />
        <Button title="Login" onPress={handleLogin} />
      </LoginContent>
    </LoginContainer>
  );
}

export default App;
