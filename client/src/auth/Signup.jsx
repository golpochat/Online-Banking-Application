import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import Layout from "../layout/common/Layout";
import axios from "axios";
import { isAuth } from "./AuthHelper";
import { toast } from "react-toastify";
import './Auth.css'

const Signup = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    btnLabel: "Submit",
  });

  const { email, password, btnLabel } = values;
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  const doSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, btnLabel: "Submitting" });
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/auth/signup`,
      data: { email, password },
    })
      .then((response) => {
        console.log("SIGNUP SUCCESSFULL", response);
        setValues({
          ...values,
          email: "",
          password: "",
          btnLabel: "Submitted",
        });
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.log("SIGNUP ERROR", error.response.data);
        setValues({ ...values, btnLabel: "Submit" });
        toast.error(error.response.data.error);
      });
  };

  const signupFrom = () => (
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
              Already a member? <Link to="/login">Click here </Link> to login.
        </small>
          </div>
          <button className="btn btn-primary btn-md" onClick={doSubmit}>
            {btnLabel}
          </button>
        </form>
      </div>
    </div>
  );
  return (
    <Layout>
      <div className="container-signup">
        {isAuth() ? <Redirect to="/" /> : null}
        <h1 className="text-center">Signup</h1>
        <hr />
        {signupFrom()}
      </div>
    </Layout>
  );
};

export default Signup;
