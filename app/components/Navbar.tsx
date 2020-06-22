import React, { useEffect } from "react";
import styled from "styled-components/native";  
import { useHistory } from "react-router-native";
import { Text, Layout } from '@ui-kitten/components';

const NavbarContainer = styled(Layout)`
  align-items: flex-end;
  justify-content: center;
  height: 48px;
`;

const LogoutText = styled(Text)`
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

  useEffect(() => {
    if (!user.token) {
      history.push("/");
    }
  }, [user]);

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
