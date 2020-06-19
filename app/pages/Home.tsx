import React, { useState, useEffect } from "react";

import AppContainer from "../components/AppContainer";
import PageTitle from "../components/PageTitle";

import api from "../api";
import { View, Text, ScrollView } from "react-native";

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
              <View>
                <Text>{title}</Text>
                <Text>{content}</Text>
              </View>
            ))
          : null}
      </ScrollView>
    </AppContainer>
  );
}

export default Home;
