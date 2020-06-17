/**
 * These enable formatting code using prettier
 *
 * @format
 */

import React, { useState } from "react";
import { Text, Button, Switch } from "react-native";
import { useHistory } from "react-router-native";
import styled from "styled-components/native";

import AppContainer from "../components/AppContainer";
import PageTitle from "../components/PageTitle";

import styles from "../styles";
import api from "../api";

const EditUserContainer = styled(AppContainer)`
  justify-content: space-between;
`;

const EditUserInput = styled.TextInput`
  border: 2px solid ${styles.darkShade};
  border-top-width: 0;
  border-left-width: 0;
  border-right-width: 0;
  color: ${styles.darkShade};
`;

const EditUserContent = styled.ScrollView``;

const EditUserRows = styled.View`
  margin-bottom: 16px;
`;

function EditUser({
  user,
  draftUser,
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
  draftUser: {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    about: string;
    status: string;
    isAdmin: boolean;
    isAuthor: boolean;
    email: string;
  };
}) {
  const [firstName, setFirstName] = useState(draftUser.firstName);
  const [lastName, setLastName] = useState(draftUser.lastName);
  const [username, setUsername] = useState(draftUser.username);
  const [about, setAbout] = useState(draftUser.about);
  const [email, setEmail] = useState(draftUser.email);
  const [status, setStatus] = useState(draftUser.status);
  const [isAdmin, setIsAdmin] = useState(draftUser.isAdmin);
  const [isAuthor, setIsAuthor] = useState(draftUser.isAuthor);

  const history = useHistory();

  function handleEditUser() {
    api(
      `users/${draftUser.id}/`,
      "PATCH",
      () => history.push("/users"),
      ({ error }) => console.log(error),
      user.token,
      {
        firstName,
        lastName,
        username,
        about,
        email,
        status,
        isAdmin,
        isAuthor,
      },
    );
  }

  return (
    <EditUserContainer>
      <PageTitle>Edit User</PageTitle>
      <EditUserContent>
        <EditUserRows>
          <Text>First Name</Text>
          <EditUserInput
            value={firstName}
            onChangeText={(value) => setFirstName(value)}
          />
        </EditUserRows>
        <EditUserRows>
          <Text>Last Name</Text>
          <EditUserInput
            value={lastName}
            onChangeText={(value) => setLastName(value)}
          />
        </EditUserRows>
        <EditUserRows>
          <Text>Username</Text>
          <EditUserInput
            value={username}
            onChangeText={(value) => setUsername(value)}
          />
        </EditUserRows>
        <EditUserRows>
          <Text>About</Text>
          <EditUserInput
            value={about}
            onChangeText={(value) => setAbout(value)}
          />
        </EditUserRows>
        <EditUserRows>
          <Text>Email</Text>
          <EditUserInput
            value={email}
            onChangeText={(value) => setEmail(value)}
          />
        </EditUserRows>
        <EditUserRows>
          <Text>Status</Text>
          <EditUserInput
            value={status}
            onChangeText={(value) => setStatus(value)}
          />
        </EditUserRows>
        <EditUserRows>
          <Text>Admin</Text>
          <Switch
            value={isAdmin}
            onValueChange={(value) => setIsAdmin(value)}
          />
        </EditUserRows>
        <EditUserRows>
          <Text>Author</Text>
          <Switch
            value={isAuthor}
            onValueChange={(value) => setIsAuthor(value)}
          />
        </EditUserRows>
        <Button
          title="Save"
          onPress={handleEditUser}
          color={styles.darkShade}
        />
      </EditUserContent>
    </EditUserContainer>
  );
}

export default EditUser;
