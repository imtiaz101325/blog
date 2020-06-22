import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { View, ScrollView } from "react-native";
import { Card, Text } from "@ui-kitten/components";

import AppContainer from "../components/AppContainer";
import PageTitle from "../components/PageTitle";

import api from "../api";

const StyledCard = styled(Card)`
  margin-bottom: 8px;
`;

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  function fetchUsers() {
    api(
      "posts",
      "GET",
      (data) => setPosts(data),
      ({ error }) => console.log(error),
    );
  }

  return (
    <AppContainer>
      <PageTitle>Home</PageTitle>
      <ScrollView>
        {posts.length
          ? posts.map(({ title, content }) => (
              <StyledCard
                header={(props) => (
                  <View {...props}>
                    <Text>{title}</Text>
                  </View>
                )}>
                <Text>{content}</Text>
              </StyledCard>
            ))
          : null}
      </ScrollView>
    </AppContainer>
  );
}

export default Home;
