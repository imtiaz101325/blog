import React, { useContext } from "react";
import styled from "styled-components/native";
import { useHistory } from "react-router-native";
import { Text, Layout } from "@ui-kitten/components";
import { UserContext } from "../containers/withUserState";

const CircleNavContainer = styled(Layout).attrs({
  level: "4",
})`
  height: 64px;
  width: 64px;
  border-radius: 32px;
  align-items: center;
  position: absolute;
  bottom: 16px;
  right: 16px;
`;

const AddPost = styled(Text)`
  font-size: 64px;
  line-height: 70px;
`;

function CircleNav() {
  const history = useHistory();
  const { user } = useContext(UserContext);

  function addPost() {
    if (user.role === "author") {
      history.push("/create-post");
    }
  }

  return (
    <CircleNavContainer>
      <AddPost onPress={addPost}>+</AddPost>
    </CircleNavContainer>
  );
}

export default CircleNav;
