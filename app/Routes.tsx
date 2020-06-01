/**
 * These enable formatting code using prettier
 *
 * @format
 */

import React from "react";
import { NativeRouter, Route, Switch } from "react-router-native";

import Landing from "./Landing";
import Login from "./Login";
import SignUp from "./SignUp";

function Routes() {
  return (
    <NativeRouter>
      <Switch>
        <Route path="/login" component={ Login } />
        <Route path="/signup" component={ SignUp } />
        <Route exact path="/" component={ Landing } />
      </Switch>
    </NativeRouter>
  );
}

export default Routes;
