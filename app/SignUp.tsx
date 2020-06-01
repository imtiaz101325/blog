import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [about, setAbout] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
  </View>
}

export default SignUp;