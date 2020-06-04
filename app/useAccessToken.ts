import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-community/async-storage';
import decode from "jwt-decode";

function useAccessToken() {
  const [user, setUser] = useState({
    id: -1,
    username: "",
    email: "",
    expiresAt: "",
    iat: "",
    token: "",
  });

  useEffect(() => {
    async function getToken() {
      try {
        const token = await AsyncStorage.getItem('@access_token');
        if (token !== null) {
          const payload: {
            id: number,
            username: string,
            email: string,
            expiresAt: string,
            iat: string,
          } = decode(token);

          setUser({
            ...payload,
            token
          });
        }
      } catch(err) {
        console.log(err);
      }
    }

    getToken();
  }, []);

  return user;
}

export default useAccessToken;