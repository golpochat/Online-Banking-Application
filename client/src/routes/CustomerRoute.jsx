import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuth, isCustomer } from "../auth/AuthHelper";

const CustomerRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuth() && isCustomer() ? (
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
export default CustomerRoute;
