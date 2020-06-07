import React from "react";
import styled from "styled-components/native";
import AsyncStorage from "@react-native-community/async-storage";
import { useHistory } from "react-router-native";

import styles from "../styles";

const NavbarContainer = styled.View`
  background-color: ${styles.lightShade};
  align-items: flex-end;
`;

const LogoutText = styled.Text`
  padding: 8px;
`;

function Navbar({
  user,
  handleLogout,
}: {
  user: {
    id: number;
    username: string;
    email: string;
    role: string;
    expiresAt: string;
    iat: string;
    token: string;
  },
  handleLogout: () => void
}) {
  const history = useHistory();

  async function logout() {
    if (user.token) {
      try {
        handleLogout();
        history.push("/");
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <NavbarContainer>
      {user.token ? <LogoutText onPress={logout}>Log Out</LogoutText> : null}
    </NavbarContainer>
  );
}

export default Navbar;
