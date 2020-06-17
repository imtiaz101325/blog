import React, { useEffect, useState } from "react";
import { ScrollView, Text, Button, ButtonProps } from "react-native";
import { useHistory } from "react-router-native";
import styled from "styled-components/native";

import AppContainer from "../components/AppContainer";
import PageTitle from "../components/PageTitle";

import styles from "../styles";
import api from "../api";

const CardContainer = styled.View`
  margin-bottom: 8px;
  background-color: ${styles.darkShade};
  padding: 16px;
  position: relative;
`;

const CardContent = styled.View`
  margin: 4px;
`;

const CardText = styled.Text`
  color: ${styles.lightShade};
`;

const CardActionContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`;

const CardButtonWrapper = styled.View`
  margin: 4px;
`;

function CardButton(props: ButtonProps) {
  return (
    <CardButtonWrapper>
      <Button {...props} />
    </CardButtonWrapper>
  );
}

const CardLink = styled.Text`
  color: red;
  text-decoration: underline;
`;

const AdminBadgeContainer = styled.View`
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: red;
  padding: 2px;
`;

function AdminBadge() {
  return (
    <AdminBadgeContainer>
      <Text>Admin</Text>
    </AdminBadgeContainer>
  );
}

function Users({
  user,
  editUser,
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
  editUser: (user: any) => void;
}) {
  const [users, setUsers] = useState([]);

  const history = useHistory();

  useEffect(() => {
    fetchUsers();
  }, [user]);

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
              <CardContainer key={id}>
                {role === "admin" && <AdminBadge />}
                <CardContent>
                  <CardText>{name}</CardText>
                  <CardText>ID: {id}</CardText>
                  <CardText>Username: {username}</CardText>
                  <CardText>Role: {role}</CardText>
                  <CardText>Email: {email}</CardText>
                  {role !== "admin" && (
                    <CardLink onPress={() => handleMakeAdmin(id)}>
                      make admin
                    </CardLink>
                  )}
                </CardContent>
                <CardActionContainer>
                  <CardButton
                    title="Edit"
                    onPress={() =>
                      editUser({
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
                    }
                  />
                  <CardButton
                    title="Delete"
                    onPress={() => deleteUser(id)}
                    color="red"
                  />
                </CardActionContainer>
              </CardContainer>
            );
          })}
      </ScrollView>
    </AppContainer>
  );
}

export default Users;
