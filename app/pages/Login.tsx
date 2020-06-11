/**
 * These enable formatting code using prettier
 *
 * @format
 */

import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { useHistory } from "react-router-native";
import { Button } from "react-native";

import AppContainer from "../components/AppContainer";
import PageTitle from "../components/PageTitle";

import styles from "../styles";

const LoginContainer = styled(AppContainer)`
  height: 90%;
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

function Login({
  user,
  setToken,
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
  setToken: (token: string) => Promise<void>;
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
        <Button title="Login" onPress={handleLogin} color={styles.darkShade} />
      </LoginContent>
    </LoginContainer>
  );
}

export default Login;
