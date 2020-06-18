/**
 * @format
 */

import React from "react";
import { AppRegistry } from "react-native";
import { NativeRouter } from "react-router-native";

import Routes from "./Routes";
import { name as appName } from "./app.json";

export function App() {
  return (
    <NativeRouter>
      <Routes />
    </NativeRouter>
  );
}

AppRegistry.registerComponent(appName, () => App);
