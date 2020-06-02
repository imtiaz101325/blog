/**
 * These enable formatting code using prettier
 *
 * @format
 */

import React from "react";
import { NativeRouter, Route, Switch, useHistory } from "react-router-native";
import { useBackHandler } from "@react-native-community/hooks";

import Landing from "./Landing";
import Login from "./Login";
import SignUp from "./SignUp";
import Users from "./Users";

function Routes() {
  const history = useHistory();

  useBackHandler(() => {
    history.goBack();
    return true;
  });

  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/signup" component={SignUp} />
      <Route path="/users" component={Users} />
      <Route exact path="/" component={Landing} />
    </Switch>
  );
}

export default Routes;
