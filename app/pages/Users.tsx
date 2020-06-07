import React, { useEffect, useState } from "react";
import { Text, ScrollView } from "react-native";
import { useHistory } from "react-router-native";
import styled from "styled-components/native";

import AppContainer from "../components/AppContainer";
import PageTitle from "../components/PageTitle";

const Row = styled.View`
  margin-bottom: 8px;
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
    async function fetchUsers() {
      try {
        if(user.token) {
          const response = await fetch("http://0.0.0.0:8000/api/v1/users", {
            headers: {
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

    fetchUsers();
  }, [user]);

  return (
    <AppContainer>
      <ScrollView>
        <PageTitle>Users</PageTitle>
        {
          users.map(({
            id,
            username,
            role,
            email,
          }) => <Row key={ id }>
            <Text>ID: {id}</Text>
            <Text>Username: {username}</Text>
            <Text>Role: {role}</Text>
            <Text>Email: {email}</Text>
          </Row>)
        }
      </ScrollView>
    </AppContainer>
  );
};

export default Users;