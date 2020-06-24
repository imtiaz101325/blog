import React from "react";
import { AppRegistry } from "react-native";
import { NativeRouter } from "react-router-native";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";

import Routes from "./Routes";
import { name as appName } from "./app.json";

export function App() {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.dark}>
        <NativeRouter>
          <Routes />
        </NativeRouter>
      </ApplicationProvider>
    </>
  );
}

AppRegistry.registerComponent(appName, () => App);
