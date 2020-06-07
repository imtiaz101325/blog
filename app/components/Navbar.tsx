import React from "react";
import styled from "styled-components/native";
import AsyncStorage from "@react-native-community/async-storage";
import { useHistory } from "react-router-native";

const NavbarContainer = styled.View``;
const LogOutButton = styled.Button``;

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
      {user.token ? <LogOutButton title="Log Out" onPress={logout} /> : null}
    </NavbarContainer>
  );
}

export default Navbar;
