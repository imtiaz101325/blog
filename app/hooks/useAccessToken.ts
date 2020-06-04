import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import decode from "jwt-decode";

const initialState = {
  id: -1,
  username: "",
  email: "",
  expiresAt: "",
  iat: "",
  token: "",
};

function useAccessToken(): [
  {
    id: number;
    username: string;
    email: string;
    expiresAt: string;
    iat: string;
    token: string;
  },
  (token: string) => void,
  () => void,
] {
  const [user, setUser] = useState(initialState);

  function handleSetUser(token: string) {
    const payload: {
      id: number;
      username: string;
      email: string;
      expiresAt: string;
      iat: string;
    } = decode(token);

    setUser({
      ...payload,
      token,
    });
  }

  useEffect(() => {
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

    getToken();
  }, []);

  async function setToken(token: string) {
    try {
      await AsyncStorage.setItem("@access_token", token);
      // FIXME: does not set state
      handleSetUser(token);
    } catch (err) {
      console.log(err);
    }
  }

  function clearUser() {
    setUser(initialState);
  }

  return [user, setToken, clearUser];
}

export default useAccessToken;
