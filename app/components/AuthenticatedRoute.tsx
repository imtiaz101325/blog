// TODO: format

import React, { useEffect, useContext, ReactNode } from "react";
import { useHistory, Route, RouteProps } from "react-router-native";

import { UserContext } from "../containers/withUserState";

export default function AuthenticatedRoute({
  children,
  ...props
}: { children: ReactNode } & RouteProps) {
  const history = useHistory();
  const { user } = useContext(UserContext);

  // TODO: handle faulty tokens
  useEffect(() => {
    if (user.token) {
      if (user.role === "admin") {
        history.push("/users");
      } else {
        history.push("/home");
      }
    }
  }, [user]);

  return <Route {...props}>{children}</Route>;
}
