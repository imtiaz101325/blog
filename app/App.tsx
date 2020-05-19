/**
 * These enable formatting code using prettier
 *
 * @format
 */

import React from "react";
import styled from "styled-components/native";

const StyledView = styled.View`
  padding: 16px;
`;

const StyledText = styled.Text`
  font-size: 32px;
  font-weight: bold;
`;

const App = () => {
  return (
    <>
      <StyledView>
        <StyledText>Blog</StyledText>
      </StyledView>
    </>
  );
};

export default App;
