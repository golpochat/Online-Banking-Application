import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

import Layout from "../layout/common/Layout";
import { authenticate, isAuth, isAdmin, getCookie } from "./AuthHelper";
import './Auth.css'

const Login = ({ history }) => {
  const [values, setValues] = useState({
    email: "sujanhossain313@gmail.com",
    password: "abcd1234",
    // email: "",
    // password: "",
    btnLabel: "Login",
  }, []);

  const { email, password, btnLabel } = values;
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickedLoginButton = (event) => {
    event.preventDefault();
    setValues({ ...values, btnLabel: "Logging" });
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/auth/login`,
      data: { email, password },
    })
      .then((response) => {
        // console.log("LOGIN SUCCESSFULL", response);
        // save the response (user, token) to local storate/cookie
        authenticate(response, () => {
          setValues({
            ...values,
            email: "",
            password: "",
            btnLabel: "Loggedin",
          });
          // checking if the profile is exist
          const token = getCookie("token");
          axios({
            method: "GET",
            url: `${process.env.REACT_APP_API}/customer/read/${isAuth().id}`,
            headers: { Authorization: `Bearer ${token}` },
          })
            .then((result) => {
              // console.log(result)
              if (result) {
                return isAdmin() ? history.push(`/`) : history.push(`/customer/profile`)
              }
              isAdmin() ? history.push(`/customer/create-admin-profile/${isAuth().id}`) : history.push(`/customer/create/${isAuth().id}`);

            })
            .catch((err) => {
              toast.error('Sometging went wrong, try again later.');
              isAdmin() ? history.push(`/customer/create-admin-profile/${isAuth().id}`) : history.push(`/customer/create/${isAuth().id}`);
            });
        });
      })
      .catch((error) => {
        // console.log("LOGIN ERROR", error.response.data);
        setValues({ ...values, btnLabel: "Login" });
        toast.error(error.response.data.error);
      });
  };

  const loginFrom = () => (
    <div className="row">
      <div className="col-sm-12 col-md-6 col-lg-6 m-auto">
        <form>
          <div className="form-group">
            <label className="text-muted">Email</label>
            <input
              onChange={handleChange("email")}
              type="email"
              className="form-control"
              placeholder="Email address"
              value={email}
            />
          </div>
          <div className="form-group">
            <label className="text-muted">Password</label>
            <input
              onChange={handleChange("password")}
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
            />
          </div>
          <div className="form-group">
            <small>
              Can't remember your password?
          <Link to="/auth/password/forgot"> Click here </Link>
          to reset.
        </small>
          </div>
          <Link className="btn btn-success btn-lg btn-block" to="#" onClick={clickedLoginButton}>
            <i className="fa fa-user-lock fa-lg pr-3" />
            {btnLabel}
          </Link>
        </form>
      </div>
    </div>
  );
  return (
    <Layout>
      <div className="container-login">
        {isAuth() ? <Redirect to="/" /> : null}
        <h1 className="text-center">Login</h1>
        <hr />
        {loginFrom()}
      </div>
    </Layout>
  );
};

export default Login;
