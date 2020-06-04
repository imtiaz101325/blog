/**
 * These enable formatting code using prettier
 *
 * @format
 */

import React from "react";
import { Route, Switch, useHistory } from "react-router-native";
import { useBackHandler } from "@react-native-community/hooks";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Users from "./pages/Users";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

function Routes() {
  const history = useHistory();

  useBackHandler(() => {
    history.goBack();
    return true;
  });

  return (
    <>
      <Navbar />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/users" component={Users} />
        <Route path="/home" component={Home} />
        <Route exact path="/" component={Landing} />
      </Switch>
    </>
  );
}

export default Routes;
