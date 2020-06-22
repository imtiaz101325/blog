/**
 * These enable formatting code using prettier
 *
 * @format
 */

import React, { useState } from "react";
import { useHistory } from "react-router-native";
import styled from "styled-components/native";
import {
  Button,
  Toggle,
  Input,
} from "@ui-kitten/components";

import AppContainer from "../components/AppContainer";
import PageTitle from "../components/PageTitle";

import api from "../api";

const EditUserContainer = styled(AppContainer)`
  justify-content: space-between;
`;

const EditUserContent = styled.ScrollView`
  flex: 0.95;
`;

const EditUserRows = styled.View`
  margin-bottom: 16px;
  align-items: flex-start;
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
          <Input
            placeholder="First Name"
            value={firstName}
            onChangeText={(value) => setFirstName(value)}
          />
        </EditUserRows>
        <EditUserRows>
          <Input
            placeholder="Last Name"
            value={lastName}
            onChangeText={(value) => setLastName(value)}
          />
        </EditUserRows>
        <EditUserRows>
          <Input
            placeholder="Username"
            value={username}
            onChangeText={(value) => setUsername(value)}
          />
        </EditUserRows>
        <EditUserRows>
          <Input
            placeholder="About"
            value={about}
            onChangeText={(value) => setAbout(value)}
          />
        </EditUserRows>
        <EditUserRows>
          <Input
            placeholder="Email"
            value={email}
            onChangeText={(value) => setEmail(value)}
          />
        </EditUserRows>
        <EditUserRows>
          <Input
            placeholder="Status"
            value={status}
            onChangeText={(value) => setStatus(value)}
          />
        </EditUserRows>
        <EditUserRows>
          <Toggle checked={isAdmin} onChange={(value) => setIsAdmin(value)}>
            Admin
          </Toggle>
        </EditUserRows>
        <EditUserRows>
          <Toggle checked={isAuthor} onChange={(value) => setIsAuthor(value)}>
            Author
          </Toggle>
        </EditUserRows>
        <Button onPress={handleEditUser}>Save</Button>
      </EditUserContent>
    </EditUserContainer>
  );
}

export default EditUser;
