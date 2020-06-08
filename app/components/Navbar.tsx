import React from "react";
import styled from "styled-components/native";  
import { useHistory } from "react-router-native";

import styles from "../styles";

const NavbarContainer = styled.View`
  background-color: ${styles.darkShade};
  align-items: flex-end;
  justify-content: center;
  height: 48px;
`;

const LogoutText = styled.Text`
  padding: 8px;
  color: ${styles.lightShade};
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
