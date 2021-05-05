import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuth, isAdmin } from "../auth/AuthHelper";

const AdminRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuth() && isAdmin() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/unauthorised-access",
            state: { from: props.location },
          }}
        />
      )
    }
  />
);
export default AdminRoute;
