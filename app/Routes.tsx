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
import EditUser from "./pages/EditUser";

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

  const [draftUser, setDraftUser] = useState({
    id: -1,
    firstName: "",
    lastName: "",
    username: "",
    about: "",
    status: "",
    isAdmin: false,
    isAuthor: false,
    email: "",
  });

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

  function handleEditUser(user: any) {
    setDraftUser(user);
  }

  useBackHandler(() => {
    history.goBack();
    return true;
  });

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    if (draftUser.username) {
      history.push("/edit-user");
    }
  }, [draftUser]);

  return (
    <>
      <Route path="/(users|home)">
        <Navbar user={user} handleLogout={handleLogout} />
      </Route>
      <Switch>
        <Route path="/login">
          <Login user={user} setToken={setToken} />
        </Route>
        <Route path="/sign-up">
          <SignUp />
        </Route>
        <Route path="/users">
          <Users user={user} editUser={handleEditUser} />
        </Route>
        <Route path="/edit-user">
          <EditUser user={user} draftUser={draftUser} />
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
