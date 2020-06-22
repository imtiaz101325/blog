import styled from "styled-components/native";
import { Text } from "@ui-kitten/components";

export default styled(Text).attrs(() => ({
  category: "h1",
}))`
  text-align: center;
  margin-bottom: 8px;
`;
