/**
 * These enable formatting code using prettier
 *
 * @format
 */

import React, { useState } from "react";
import { useHistory } from "react-router-native";
import styled from "styled-components/native";
import { Button, Input } from "@ui-kitten/components";

import AppContainer from "../components/AppContainer";
import PageTitle from "../components/PageTitle";

import api from "../api";

const SignUpContainer = styled(AppContainer)`
  justify-content: space-between;
`;

const SignUpContent = styled.ScrollView`
  flex: 0.85;
`;

const SignUpRows = styled.View`
  margin-bottom: 16px;
`;

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [about, setAbout] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const history = useHistory();

  const handleSignUp = () =>
    api(
      "users",
      "POST",
      () => history.push("/login"),
      ({ error }) => console.log(error),
      undefined,
      {
        firstName,
        lastName,
        username,
        about,
        email,
        password,
      },
    );

  return (
    <SignUpContainer>
      <PageTitle>Sign Up</PageTitle>
      <SignUpContent>
        <SignUpRows>
          <Input
            placeholder="First Name"
            value={firstName}
            onChangeText={(value) => setFirstName(value)}
          />
        </SignUpRows>
        <SignUpRows>
          <Input
            placeholder="Last Name"
            value={lastName}
            onChangeText={(value) => setLastName(value)}
          />
        </SignUpRows>
        <SignUpRows>
          <Input
            placeholder="Username"
            value={username}
            onChangeText={(value) => setUsername(value)}
          />
        </SignUpRows>
        <SignUpRows>
          <Input
            placeholder="About"
            value={about}
            onChangeText={(value) => setAbout(value)}
          />
        </SignUpRows>
        <SignUpRows>
          <Input
            placeholder="Email"
            value={email}
            onChangeText={(value) => setEmail(value)}
          />
        </SignUpRows>
        <SignUpRows>
          <Input
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={(value) => setPassword(value)}
          />
        </SignUpRows>
        <SignUpRows>
          <Input
            placeholder="Confirm password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={(value) => setConfirmPassword(value)}
          />
        </SignUpRows>
        <Button onPress={handleSignUp}>
          Sign Up
        </Button>
      </SignUpContent>
    </SignUpContainer>
  );
}

export default SignUp;
