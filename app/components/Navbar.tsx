import React from "react";
import styled from "styled-components/native";
import {
  TopNavigation,
  TopNavigationAction,
  Layout,
  Icon,
} from "@ui-kitten/components";
import { useLocation, useHistory } from "react-router-native";

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
  const location = useLocation();
  const history = useHistory();

  function getRightIcon() {
    if (drawerVisibility || location.pathname === "/create-post") {
      return "close";
    }

    return "person";
  }

  function handleRightIconAction() {
    if (location.pathname === "/create-post") {
      history.goBack();
    } else {
      toggleDrawer();
    }
  }

  function renderMenuIcon() {
    return (
      <TopNavigationAction
        icon={(props) => (
          <IconContainer>
            <Icon
              {...props}
              name={getRightIcon()}
              onPress={handleRightIconAction}
            />
          </IconContainer>
        )}
      />
    );
  }
  return <TopNavigation accessoryRight={renderMenuIcon} />;
}

export default Navbar;
