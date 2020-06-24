import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import { useHistory } from "react-router-native";
import decode from "jwt-decode";

import api from "../api";

const initialState = {
  id: -1,
  username: "",
  email: "",
  role: "",
  expiresAt: "",
  iat: "",
  token: "",
};

export const UserContext = createContext({
  user: initialState,
  handleLogout: async () => {},
  setToken: (token: string) => {},
});

export default function withUserState(
  WrappedComponent: () => JSX.Element,
) {
  return function UserStateWrapper(props: {}) {
    const [user, setUser] = useState(initialState);
    const history = useHistory();

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

    async function handleLogout() {
      await api(
        "auth",
        "DELETE",
        () => setToken(""),
        (error) => console.log(error),
        user.token,
      );
    }

    useEffect(() => {
      if (!user.token) {
        history.push("/");
      }
    }, [user]);

    useEffect(() => {
      getToken();
    }, []);

    return (
      <UserContext.Provider
        value={{
          user,
          handleLogout,
          setToken,
        }}>
        <WrappedComponent {...props} />
      </UserContext.Provider>
    );
  };
}
