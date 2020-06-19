/**
 * These enable formatting code using prettier
 *
 * @format
 */

import React, { useState } from "react";
import { Text, Button } from "react-native";
import { useHistory } from "react-router-native";
import styled from "styled-components/native";

import AppContainer from "../components/AppContainer";
import PageTitle from "../components/PageTitle";

import styles from "../styles";
import api from "../api";

const SignUpContainer = styled(AppContainer)`
  justify-content: space-between;
`;

const SignUpInput = styled.TextInput`
  border: 2px solid ${styles.darkShade};
  border-top-width: 0;
  border-left-width: 0;
  border-right-width: 0;
  color: ${styles.darkShade};
`;

const SignUpContent = styled.ScrollView``;

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
          <Text>First Name</Text>
          <SignUpInput
            value={firstName}
            onChangeText={(value) => setFirstName(value)}
          />
        </SignUpRows>
        <SignUpRows>
          <Text>Last Name</Text>
          <SignUpInput
            value={lastName}
            onChangeText={(value) => setLastName(value)}
          />
        </SignUpRows>
        <SignUpRows>
          <Text>Username</Text>
          <SignUpInput
            value={username}
            onChangeText={(value) => setUsername(value)}
          />
        </SignUpRows>
        <SignUpRows>
          <Text>About</Text>
          <SignUpInput
            value={about}
            onChangeText={(value) => setAbout(value)}
          />
        </SignUpRows>
        <SignUpRows>
          <Text>Email</Text>
          <SignUpInput
            value={email}
            onChangeText={(value) => setEmail(value)}
          />
        </SignUpRows>
        <SignUpRows>
          <Text>Password</Text>
          <SignUpInput
            secureTextEntry
            value={password}
            onChangeText={(value) => setPassword(value)}
          />
        </SignUpRows>
        <SignUpRows>
          <Text>Confirm password</Text>
          <SignUpInput
            secureTextEntry
            value={confirmPassword}
            onChangeText={(value) => setConfirmPassword(value)}
          />
        </SignUpRows>
        <Button
          title="Sign Up"
          onPress={handleSignUp}
          color={styles.darkShade}
        />
      </SignUpContent>
    </SignUpContainer>
  );
}

export default SignUp;
