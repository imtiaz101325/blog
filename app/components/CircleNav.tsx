import React from "react";
import styled from "styled-components/native";
import { useHistory } from "react-router-native";

import styles from "../styles";

const CircleNavContainer = styled.View`
  background-color: ${styles.darkShade};
  height: 64px;
  width: 64px;
  border-radius: 32px;
  align-items: center;
  position: absolute;
  bottom: 16px;
  right: 16px;
`;

const AddPost = styled.Text`
  color: ${styles.lightShade};
  font-size: 64px;
  line-height: 70px;
`;

function CircleNav({
  user,
}: {
  user: {
    id: number;
    username: string;
    email: string;
    role: string;
    expiresAt: string;
    iat: string;
    token: string;
  };
}) {
  const history = useHistory();

  function addPost() {
    if (user.role === "author") {
      history.push("/create-post")
    }
  }

  return (
    <CircleNavContainer>
      <AddPost onPress={ addPost }>+</AddPost>
    </CircleNavContainer>
  );
}

export default CircleNav;