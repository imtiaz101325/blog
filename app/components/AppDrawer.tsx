import React, { useContext } from "react";
import {
  Drawer,
  IndexPath,
  DrawerItem,
  Icon,
  Layout,
} from "@ui-kitten/components";
import styled from "styled-components/native";
import { useDimensions } from "@react-native-community/hooks";

import { UserContext } from "../containers/withUserState";

export default function AppDrawer({
  toggleDrawer,
}: {
  toggleDrawer: () => void;
}) {
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
  const { height, width } = useDimensions().window;
  const { user, handleLogout } = useContext(UserContext);

  async function logout() {
    if (user.token) {
      try {
        await handleLogout();
        toggleDrawer();
      } catch (err) {
        console.log(err);
      }
    }
  }

  const navbarHeight = 56;
  const statusBarHeight = 24;
  const StyledDrawer = styled(Drawer)`
    position: absolute;
    top: ${navbarHeight + statusBarHeight}px;
    right: 0px;
    z-index: 100;
    height: ${height - navbarHeight}px;
    width: ${width / 1.45}px;
    flex-direction: column-reverse;
    padding-bottom: ${statusBarHeight * 2}px;
  `;

  return (
    <StyledDrawer
      selectedIndex={selectedIndex}
      onSelect={(index) => setSelectedIndex(index)}>
      <DrawerItem
        accessoryRight={(props) => <Icon name="log-out" {...props} />}
        onPress={logout}
        title="Log Out"
      />
    </StyledDrawer>
  );
}
