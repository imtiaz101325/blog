import React, { useEffect, useState, useContext } from "react";
import { ScrollView, View } from "react-native";
import { useHistory } from "react-router-native";
import styled from "styled-components/native";
import { Button, Card, Layout, Text, Icon } from "@ui-kitten/components";

import AppContainer from "../components/AppContainer";
import PageTitle from "../components/PageTitle";

import { UserContext } from "../containers/withUserState";

import api from "../api";

const CardContainer = styled(Card)`
  margin-bottom: 16px;
`;

const CardHeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const CardActionContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`;

const CardButton = styled(Button)`
  margin: 4px;
`;

const CardLink = styled(Text)`
  text-decoration: underline;
`;

const AdminBadgeContainer = styled(Layout)`
  flex-direction: row;
  align-items: center;
  padding: 0 4px;
`;

const StyledIcon = styled(Icon)`
  height: 16px;
  width: 16px;
  margin-right: 4px;
`;

function AdminBadge() {
  return (
    <AdminBadgeContainer level="4">
      <StyledIcon name="person-outline" fill="#fff" />
      <Text status="danger">Admin</Text>
    </AdminBadgeContainer>
  );
}

function Users({
  handleEditUser,
}: {
  handleEditUser: (user: {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    about: string;
    status: string;
    isAdmin: boolean;
    isAuthor: boolean;
    email: string;
  }) => void;
}) {
  const [users, setUsers] = useState([]);
  const history = useHistory();
  const { user } = useContext(UserContext);

  useEffect(() => {
    fetchUsers();
  }, []);

  function fetchUsers() {
    if (user.token) {
      api(
        "users",
        "GET",
        (data) => setUsers(data),
        ({ error }) => console.log(error),
        user.token,
      );
    } else {
      history.push("/login");
    }
  }

  function handleMakeAdmin(id: number) {
    if (user.token) {
      api(
        `users/${id}`,
        "PATCH",
        () => fetchUsers(),
        ({ error }) => console.log(error),
        user.token,
        {
          isAdmin: true,
        },
      );
    } else {
      history.push("/login");
    }
  }

  function deleteUser(id: number) {
    if (user.token && user.role === "admin") {
      api(
        `users/${id}`,
        "DELETE",
        () => setUsers(users.filter(({ id: userId }) => userId !== id)),
        ({ error }) => console.log(error),
        user.token,
      );
    }
  }

  return (
    <AppContainer>
      <ScrollView>
        <PageTitle>Users</PageTitle>
        {users
          .sort(({ id: _idA }, { id: _idB }) => {
            return _idA - _idB;
          })
          .map((user) => {
            const {
              id,
              role,
              name,
              firstName,
              lastName,
              username,
              about,
              status,
              isAdmin,
              isAuthor,
              email,
            } = user;

            return (
              <CardContainer
                key={id}
                header={(props) => (
                  <CardHeaderContainer {...props}>
                    <Text>{name}</Text>
                    {role === "admin" && <AdminBadge />}
                  </CardHeaderContainer>
                )}
                footer={(props) => (
                  <CardActionContainer {...props}>
                    <CardButton
                      onPress={() =>
                        handleEditUser({
                          id,
                          firstName,
                          lastName,
                          username,
                          about,
                          status,
                          isAdmin,
                          isAuthor,
                          email,
                        })
                      }>
                      Edit
                    </CardButton>
                    <CardButton status="danger" onPress={() => deleteUser(id)}>
                      Delete
                    </CardButton>
                  </CardActionContainer>
                )}>
                <View>
                  <Text>ID: {id}</Text>
                  <Text>Username: {username}</Text>
                  <Text>Role: {role}</Text>
                  <Text>Email: {email}</Text>
                  {role !== "admin" && (
                    <CardLink
                      appearance="alternative"
                      status="danger"
                      onPress={() => handleMakeAdmin(id)}>
                      make admin
                    </CardLink>
                  )}
                </View>
              </CardContainer>
            );
          })}
      </ScrollView>
    </AppContainer>
  );
}

export default Users;
