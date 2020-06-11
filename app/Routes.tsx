/**
 * These enable formatting code using prettier
 *
 * @format
 */

import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-native";
import { useBackHandler } from "@react-native-community/hooks";
import AsyncStorage from "@react-native-community/async-storage";
import decode from "jwt-decode";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Users from "./pages/Users";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

const initialState = {
  id: -1,
  username: "",
  email: "",
  role: "",
  expiresAt: "",
  iat: "",
  token: "",
};

function Routes() {
  const history = useHistory();
  const [user, setUser] = useState(initialState);

  function handleSetUser(token: string) {
    const payload: {
      id: number;
      username: string;
      email: string;
      role: string;
      expiresAt: string;
      iat: string;
    } = decode(token);

    setUser({
      ...payload,
      token,
    });
  }

  async function getToken() {
    try {
      const token = await AsyncStorage.getItem("@access_token");
      if (token !== null) {
        handleSetUser(token);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function setToken(token: string) {
    try {
      if (token) {
        await AsyncStorage.setItem("@access_token", token);
        handleSetUser(token);
      } else {
        await AsyncStorage.removeItem("@access_token");
        setUser(initialState);
      }
    } catch (err) {
      console.log(err);
    }
  }

  function handleLogout() {
    setToken("");
  }

  useBackHandler(() => {
    history.goBack();
    return true;
  });

  useEffect(() => {
    getToken();
  }, []);

  return (
    <>
      <Navbar user={user} handleLogout={handleLogout} />
      <Switch>
        <Route path="/login">
          <Login user={user} setToken={setToken} />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/users">
          <Users user={user} />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route exact path="/">
          <Landing user={user} />
        </Route>
      </Switch>
    </>
  );
}

export default Routes;
