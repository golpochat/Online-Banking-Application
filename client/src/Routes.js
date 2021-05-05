import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./App";

import Signup from "./auth/Signup";
import CustomerRoute from "./routes/CustomerRoute";
import AdminRoute from "./routes/AdminRoute";
import Activate from "./auth/Activate";
import Forgot from "./auth/Forgot";
import Login from "./auth/Login";
import Reset from "./auth/Reset";

import UnauthorisedAccess from "./auth/unauthorised-access";
import NotFound from "./auth/404";

import ListUser from "./user/pages/List";

import CustomerList from "./customer/pages/List";
import AdminProfile from "./customer/pages/AdminProfile";
import Profile from "./customer/pages/Profile";
import UpdateAdminProfile from "./customer/pages/UpdateAdminProfile";
import UpdateCustomer from "./customer/pages/Update";
import CreateCustomer from "./customer/pages/Create";

import CreatePayee from "./payee/pages/Create";
import UpdatePayee from "./payee/pages/Update";
import ViewPayee from "./payee/pages/View";
import ListPayee from "./payee/pages/List";
import DeletePayee from "./payee/pages/Delete";

import CreateAccount from "./account/pages/Create";
import UpdateAccount from "./account/pages/Update";
import ViewAccount from "./account/pages/View";
import ListAccount from "./account/pages/List";
import DeleteAccount from "./account/pages/Delete";

import CreateTransaction from "./transaction/pages/Create";
import UpdateTransaction from "./transaction/pages/Update";
import ViewTransaction from "./transaction/pages/View";
import ListTransaction from "./transaction/pages/List";
import DeleteTransaction from "./transaction/pages/Delete";

import UpdateCustomerPassword from "./user/pages/UpdateCustomerPassword";
import UpdateAdminPassword from "./user/pages/UpdateAdminPassword";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        {/* Authenticated route */}
        <Route path="/signup" exact component={Signup} />
        <Route path="/login" exact component={Login} />
        <Route path="/auth/password/forgot" exact component={Forgot} />
        <Route path="/auth/password/reset/:token" exact component={Reset} />
        <Route path="/auth/activate/:token" exact component={Activate} />
        <Route
          path="/unauthorised-access"
          exact
          component={UnauthorisedAccess}
        />

        {/* Unathenticated route */}
        <Route path="/" exact component={App} />

        {/* Customer route */}
        <CustomerRoute path="/customer/profile" exact component={Profile} />
        <CustomerRoute
          path="/customer/create"
          exact
          component={CreateCustomer}
        />
        <CustomerRoute
          path="/customer/update"
          exact
          component={UpdateCustomer}
        />

        {/* Admin route */}
        <AdminRoute path="/customer/list" exact component={CustomerList} />
        <AdminRoute
          path="/customer/admin-profile"
          exact
          component={AdminProfile}
        />
        <AdminRoute
          path="/customer/create-admin-profile"
          exact
          component={CreateCustomer}
        />
        <AdminRoute
          path="/customer/update-admin-profile"
          exact
          component={UpdateAdminProfile}
        />

        {/* Payee route */}
        <AdminRoute path="/payee/list" exact component={ListPayee} />
        <CustomerRoute path="/payee/create/:id" exact component={CreatePayee} />
        <CustomerRoute path="/payee/update/:id" exact component={UpdatePayee} />
        <CustomerRoute path="/payee/view/:id" exact component={ViewPayee} />
        <CustomerRoute path="/payee/delete/:id" exact component={DeletePayee} />

        {/* Account route */}
        <AdminRoute path="/account/list" exact component={ListAccount} />
        <CustomerRoute
          path="/account/create/:id"
          exact
          component={CreateAccount}
        />
        <CustomerRoute
          path="/account/update/:id"
          exact
          component={UpdateAccount}
        />
        <CustomerRoute path="/account/view/:id" exact component={ViewAccount} />
        <CustomerRoute
          path="/account/delete/:id"
          exact
          component={DeleteAccount}
        />

        {/* Transaction route */}
        <AdminRoute
          path="/transaction/list"
          exact
          component={ListTransaction}
        />
        <CustomerRoute
          path="/transaction/create/:id"
          exact
          component={CreateTransaction}
        />
        <CustomerRoute
          path="/transaction/update/:id"
          exact
          component={UpdateTransaction}
        />
        <CustomerRoute
          path="/transaction/view/:id"
          exact
          component={ViewTransaction}
        />
        <CustomerRoute
          path="/transaction/delete/:id"
          exact
          component={DeleteTransaction}
        />

        {/* User route */}
        <CustomerRoute
          path="/user/update-customer-password"
          exact
          component={UpdateCustomerPassword}
        />
        <AdminRoute
          path="/user/update-admin-password"
          exact
          component={UpdateAdminPassword}
        />
        <AdminRoute path="/user/list" exact component={ListUser} />

        {/* 404 route */}
        <Route path="/" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
