import React, { useState } from "react";
import styled from "styled-components/native";
import { useHistory } from "react-router-native";
import { Button, Text, Input } from "@ui-kitten/components";

import AppContainer from "../components/AppContainer";
import PageTitle from "../components/PageTitle";

import api from "../api";

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
          <Input
            placeholder="Title"
            value={title}
            onChangeText={(value) => setTitle(value)}
          />
        </CreatePostRows>
        <CreatePostRows>
          <Input
            multiline
            value={content}
            placeholder="Post"
            numberOfLines={20}
            textStyle={{
              textAlignVertical: "top",
            }}
            onChangeText={(value) => setContent(value)}
          />
        </CreatePostRows>
        <Button onPress={handleCreatePost}>Create Post</Button>
      </CreatePostContent>
    </AppContainer>
  );
}

export default CreatePost;
