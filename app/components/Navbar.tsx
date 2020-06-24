import React, { useContext } from "react";
import styled from "styled-components/native";
import { Text, Layout } from "@ui-kitten/components";

import { UserContext } from "../containers/withUserState";

const NavbarContainer = styled(Layout)`
  align-items: flex-end;
  justify-content: center;
  height: 48px;
`;

const LogoutText = styled(Text)`
  padding: 8px;
`;

function Navbar() {
  const { user, handleLogout } = useContext(UserContext);

  async function logout() {
    if (user.token) {
      try {
        handleLogout();
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
