import React, { useEffect, useState } from "react";
import { ScrollView, Button } from "react-native";
import { useHistory } from "react-router-native";
import styled from "styled-components/native";

import AppContainer from "../components/AppContainer";
import PageTitle from "../components/PageTitle";

import styles from "../styles";

const CardContainer = styled.View`
  margin-bottom: 8px;
  background-color: ${styles.darkShade};
  padding: 16px;
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

const CardButton = styled.Button`
  margin: 0;
`;

function Users({
  user,
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
}) {
  const [users, setUsers] = useState([]);

  const history = useHistory();

  useEffect(() => {
    fetchUsers();
  }, [user]);

  async function fetchUsers() {
    try {
      if(user.token) {
        const response = await fetch("http://0.0.0.0:8000/api/v1/users", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Authorization": `Barer ${user.token}`
          }
        });

        if (response.ok) {
          const data = await response.json();

          setUsers(data);
        }
      } else {
        history.push("/login");
      }
    } catch(err) {
      console.log(err);
    }
  }

  async function deleteUser(id: number) {
    try {
      // TODO: handle admin user authenticated
      if(user.token) {
        const response = await fetch("http://0.0.0.0:8000/api/v1/users", {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Authorization": `Barer ${user.token}`,
          },
          body: JSON.stringify({
            id
          }),
        });

        if (response.ok) {
          setUsers(users.filter(({ id: userId }) => userId !== id ));
        }
      }
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <AppContainer>
      <ScrollView>
        <PageTitle>Users</PageTitle>
        {
          users.map(({
            id,
            name,
            username,
            role,
            email,
          }) => <CardContainer key={ id }>
            <CardContent>
              <CardText>{name}</CardText>
              <CardText>ID: {id}</CardText>
              <CardText>Username: {username}</CardText>
              <CardText>Role: {role}</CardText>
              <CardText>Email: {email}</CardText>
            </CardContent>
            <CardActionContainer>
              <CardButton title="Delete" onPress={ () => deleteUser(id) } color="red" />
            </CardActionContainer>
          </CardContainer>)
        }
      </ScrollView>
    </AppContainer>
  );
};

export default Users;