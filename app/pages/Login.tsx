import React, { useState, useContext } from "react";
import styled from "styled-components/native";
import { Link } from "react-router-native";
import { Text, Button, Input } from "@ui-kitten/components";

import AppContainer from "../components/AppContainer";
import PageTitle from "../components/PageTitle";

import { UserContext } from "../containers/withUserState";

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

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setToken } = useContext(UserContext);

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
