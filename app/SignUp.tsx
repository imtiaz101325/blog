/**
 * These enable formatting code using prettier
 *
 * @format
 */

import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { useHistory } from "react-router-native";

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
      const response: any = await fetch("https://192.168.10.52:8000//users", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
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
        history.push('/login');
      }
    } catch (err) {
      console.log(err)
    }
  }

  return <View>
    <Text>Sign Up</Text>
    <View>
      <Text>First Name</Text>
      <TextInput value={ firstName } onChangeText={(value) => setFirstName(value)} />
      <Text>Last Name</Text>
      <TextInput value={ lastName } onChangeText={(value) => setLastName(value)} />
      <Text>Username</Text>
      <TextInput value={ username } onChangeText={(value) => setUsername(value)} />
      <Text>About</Text>
      <TextInput value={ about } onChangeText={(value) => setAbout(value)} />
      <Text>Email</Text>
      <TextInput value={ email } onChangeText={(value) => setEmail(value)} />
      <Text>Password</Text>
      <TextInput value={ password } onChangeText={(value) => setPassword(value)} />
    </View>
    <Button title="Sign Up" onPress={ handleSignUp } />
  </View>
}

export default SignUp;