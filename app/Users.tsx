import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import { useHistory } from "react-router-native";

function Users() {
  const [users, setUsers] = useState([]);

  const history = useHistory();

  useEffect(() => {
    async function fetchUsers() {
      try {
        const token = await AsyncStorage.getItem('@access_token');

        if(token !== null) {
          const response = await fetch("http://0.0.0.0:8000/api/v1/users", {
            headers: {
              "Authorization": `Barer ${token}`
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
  }, []);

  return (
    <View>
      {
        users.map(({
          id,
          username,
          role,
          email,
        }) => <View key={ id }>
          <Text>ID: {id}</Text>
          <Text>Username: {username}</Text>
          <Text>Role: {role}</Text>
          <Text>Email: {email}</Text>
        </View>)
      }
    </View>
  );
};

export default Users;