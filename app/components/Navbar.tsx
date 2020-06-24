import React from "react";
import styled from "styled-components/native";
import {
  TopNavigation,
  TopNavigationAction,
  Layout,
  Icon,
} from "@ui-kitten/components";

const IconContainer = styled(Layout).attrs({
  level: "4",
})`
  height: 36px;
  width: 36px;
  border-radius: 18px;
  align-items: center;
  justify-content: center;
`;

function Navbar({
  toggleDrawer,
  drawerVisibility,
}: {
  toggleDrawer: () => void;
  drawerVisibility: boolean;
}) {
  function renderMenuIcon() {
    return (
      <TopNavigationAction
        icon={(props) => (
          <IconContainer>
            <Icon
              name={drawerVisibility ? "close" : "person"}
              {...props}
              onPress={toggleDrawer}
            />
          </IconContainer>
        )}
      />
    );
  }
  return <TopNavigation accessoryRight={renderMenuIcon} />;
}

export default Navbar;
