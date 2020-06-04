/**
 * These enable formatting code using prettier
 *
 * @format
 */

import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { useHistory } from "react-router-native";
import styled from "styled-components/native";

import AppContainer from "../components/AppContainer";
import PageTitle from "../PageTitle";

import styles from "../styles";

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

const SignUpContent = styled.View`
  height: 80%;
  justify-content: space-around;
`;

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [about, setAbout] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const handleSignUp = async () => {
    try {
      const response: any = await fetch("http://0.0.0.0:8000/api/v1/users", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          username,
          about,
          email,
          password,
        }),
      });

      if (response.ok) {
        history.push("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SignUpContainer>
      <PageTitle>Sign Up</PageTitle>
      <SignUpContent>
        <View>
          <Text>First Name</Text>
          <SignUpInput
            value={firstName}
            onChangeText={(value) => setFirstName(value)}
          />
        </View>
        <View>
          <Text>Last Name</Text>
          <SignUpInput
            value={lastName}
            onChangeText={(value) => setLastName(value)}
          />
        </View>
        <View>
          <Text>Username</Text>
          <SignUpInput
            value={username}
            onChangeText={(value) => setUsername(value)}
          />
        </View>
        <View>
          <Text>About</Text>
          <SignUpInput
            value={about}
            onChangeText={(value) => setAbout(value)}
          />
        </View>
        <View>
          <Text>Email</Text>
          <SignUpInput
            value={email}
            onChangeText={(value) => setEmail(value)}
          />
        </View>
        <View>
          <Text>Password</Text>
          <SignUpInput
            value={password}
            onChangeText={(value) => setPassword(value)}
          />
        </View>
        <Button title="Sign Up" onPress={handleSignUp} />
      </SignUpContent>
    </SignUpContainer>
  );
}

export default SignUp;
