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
import decode from "jwt-decode";

import AppContainer from "../components/AppContainer";
import PageTitle from "../PageTitle";

import useAccessToken from "../hooks/useAccessToken";

import styles from "../styles";

const LoginContainer = styled(AppContainer)`
  justify-content: space-between;
`;

const LightText = styled.Text`
  color: ${styles.lightShade};
`;

const DarkText = styled.Text`
  color: ${styles.darkShade};
`;

const LoginInput = styled.TextInput`
  border: 2px solid ${styles.darkShade};
  border-top-width: 0;
  border-left-width: 0;
  border-right-width: 0;
  color: ${styles.darkShade};
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
  const [user, setToken, clearUser] = useAccessToken();

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
        setToken(token);

        const { role } = decode(token);

        if (role === "admin") {
          history.push("/users");
        } else {
          history.push("/home");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <LoginContainer>
      <PageTitle>Login</PageTitle>
      <LoginContent>
        <DarkText>Username</DarkText>
        <LoginInput
          value={username}
          onChangeText={(value) => setUsername(value)}
        />
        <DarkText>password</DarkText>
        <LoginInput
          secureTextEntry
          value={password}
          onChangeText={(value) => setPassword(value)}
        />
        <Button title="Login" onPress={handleLogin} />
      </LoginContent>
    </LoginContainer>
  );
}

export default App;
