import React from "react";
import styled from "styled-components/native";
import AsyncStorage from '@react-native-community/async-storage';
import { useHistory } from "react-router-native";

import useAccessToken from "../hooks/useAccessToken";

const NavbarContainer = styled.View``;
const LogOutButton = styled.Button``;

function Navbar() {
  const [user, setToken, clearUser] = useAccessToken();
  const history = useHistory();

  async function logout() {
    if (user.token) {
      try {
        await AsyncStorage.removeItem('@access_token');
        clearUser();
        history.push("/");
      } catch (err) {
        console.log(err)
      }
    }
  }

  return (
    <NavbarContainer>
      { user.token ? <LogOutButton title="Log Out" onPress={ logout } /> : null }
    </NavbarContainer>
  );
}

export default Navbar;
