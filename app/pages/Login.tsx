/**
 * These enable formatting code using prettier
 *
 * @format
 */

import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { useHistory, Link } from "react-router-native";
import { Text, Button, Input } from "@ui-kitten/components";

import AppContainer from "../components/AppContainer";
import PageTitle from "../components/PageTitle";

import api from "../api";

const LoginContainer = styled(AppContainer)`
  height: 90%;
  justify-content: space-between;
`;

const LoginContent = styled.View`
  padding: 16px;
  height: 250px;
  justify-content: space-between;
`;

const SignUpTextContainer = styled.View`
  flex-direction: row;
  justify-content: center;
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

  const handleLogin = () =>
    api(
      "auth",
      "POST",
      ({ token }) => setToken(token),
      ({ error }) => console.log(error),
      undefined,
      {
        username,
        password,
      },
    );

  return (
    <LoginContainer>
      <PageTitle>Login</PageTitle>
      <LoginContent>
        <Input
          placeholder="Username"
          value={username}
          onChangeText={(value) => setUsername(value)}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(value) => setPassword(value)}
        />
        <Button onPress={handleLogin}>Login</Button>
        <SignUpTextContainer>
          <Text>Don't have an account? </Text>
          <Link to="/sign-up">
            <Text status="info">Sign Up</Text>
          </Link>
        </SignUpTextContainer>
      </LoginContent>
    </LoginContainer>
  );
}

export default Login;
