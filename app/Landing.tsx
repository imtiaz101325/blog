/**
 * These enable formatting code using prettier
 *
 * @format
 */

import React from "react";
import styled from "styled-components/native";
import { Link } from "react-router-native";
import { Text } from "react-native";

const HomePageContainer = styled.View`
  padding: 16px;
  background-color: #f4f4f4;
`;

const HomePageTitle = styled.Text`
  font-size: 32px;
  text-align: center;
  font-weight: bold;
`;

function Landing() {
  return (
    <HomePageContainer>
      <HomePageTitle>Blog</HomePageTitle>
      <Link to="/login">
        <Text>Login</Text>
      </Link>
      <Link to="/signup">
        <Text>SignUp</Text>
      </Link>
    </HomePageContainer>
  );
}

export default Landing;
