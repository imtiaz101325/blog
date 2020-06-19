import React, { useState } from "react";
import styled from "styled-components/native";
import { Text, Button } from "react-native";
import { useHistory } from "react-router-native";

import AppContainer from "../components/AppContainer";
import PageTitle from "../components/PageTitle";

import styles from "../styles";
import api from "../api";

const CreatePostInput = styled.TextInput`
  border: 2px solid ${styles.darkShade};
  border-top-width: 0;
  border-left-width: 0;
  border-right-width: 0;
  color: ${styles.darkShade};
`;

const CreatePostContent = styled.ScrollView``;

const CreatePostRows = styled.View`
  margin-bottom: 16px;
`;

function CreatePost({
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
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const history = useHistory();

  function handleCreatePost() {
    api(
      "posts",
      "POST",
      () => history.push("/home"),
      (error) => console.log(error),
      user.token,
      {
        title,
        content,
      },
    );
  }

  return (
    <AppContainer>
      <PageTitle>Create Post</PageTitle>
      <CreatePostContent>
        <CreatePostRows>
          <Text>Title</Text>
          <CreatePostInput
            value={title}
            onChangeText={(value) => setTitle(value)}
          />
        </CreatePostRows>
        <CreatePostRows>
          <Text>Post</Text>
          <CreatePostInput
            multiline={true}
            numberOfLines={20}
            value={content}
            onChangeText={(value) => setContent(value)}
          />
        </CreatePostRows>
        <Button
          title="Create Post"
          onPress={handleCreatePost}
          color={styles.darkShade}
        />
      </CreatePostContent>
    </AppContainer>
  );
}

export default CreatePost;
