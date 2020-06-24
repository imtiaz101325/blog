/**
 * These enable formatting code using prettier
 *
 * @format
 */

import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-native";
import { useBackHandler } from "@react-native-community/hooks";
import { Divider } from "@ui-kitten/components";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Users from "./pages/Users";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import EditUser from "./pages/EditUser";
import CircleNav from "./components/CircleNav";
import CreatePost from "./pages/CreatePost";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import AppDrawer from "./components/AppDrawer";

import withUserState from "./containers/withUserState";

function Routes() {
  const [drawerVisibility, setDrawerVisibility] = useState(false);
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
  const history = useHistory();

  function toggleDrawer() {
    setDrawerVisibility(!drawerVisibility);
  }

  function handleEditUser(user: any) {
    setDraftUser(user);
  }

  useBackHandler(() => {
    history.goBack();
    return true;
  });

  useEffect(() => {
    if (draftUser.username) {
      history.push("/edit-user");
    }
  }, [draftUser]);

  return (
    <>
      <Route path="/(users|home|create-post)">
        <Navbar
          toggleDrawer={toggleDrawer}
          drawerVisibility={drawerVisibility}
        />
        <Divider />
      </Route>
      <Switch>
        <AuthenticatedRoute path="/login">
          <Login />
        </AuthenticatedRoute>
        <Route path="/sign-up">
          <SignUp />
        </Route>
        <Route path="/users">
          <Users handleEditUser={handleEditUser} />
        </Route>
        <Route path="/edit-user">
          <EditUser draftUser={draftUser} />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/create-post">
          <CreatePost />
        </Route>
        <AuthenticatedRoute exact path="/">
          <Landing />
        </AuthenticatedRoute>
      </Switch>
      <CircleNav />
      {drawerVisibility && <AppDrawer toggleDrawer={toggleDrawer} />}
    </>
  );
}

export default withUserState(Routes);
