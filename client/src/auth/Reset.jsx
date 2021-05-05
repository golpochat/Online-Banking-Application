import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import Layout from "../layout/common/Layout";

const Reset = ({ match }) => {
  const [values, setValues] = useState({
    token: "",
    newPassword: "",
    btnLabel: "Reset now",
  });
  useEffect(() => {
    let token = match.params.token;
    if (token) {
      setValues({ ...values, token });
    }
  }, []);
  const { token, newPassword, btnLabel } = values;
  const handleChange = (event) => {
    setValues({ ...values, newPassword: event.target.value });
  };
  const submit = (event) => {
    event.preventDefault();
    setValues({ ...values, btnLabel: "Resetting" });
    axios({
      method: "PUT",
      url: `${process.env.REACT_APP_API}/auth/reset-password`,
      data: { newPassword, resetPasswordLink: token },
    })
      .then((response) => {
        console.log("RESET PASSWORD SUCCESS", response);

        toast.success(response.data.message);
        setValues({ ...values, btnLabel: "Done" });
        // history.push('/login')
      })
      .catch((error) => {
        console.log("RESET PASSWORD ERROR", error.response.data);
        toast.error(error.response.data.error);
        setValues({
          ...values,
          btnLabel: "Reset now",
        });
      });
  };

  const passwordResetForm = () => (
    <div className="row">
      <div className="col-sm-12 col-md-6 col-lg-6 m-auto">
        <form>
          <div className="form-group">
            <label className="text-muted">Password</label>
            <input
              onChange={handleChange}
              type="password"
              className="form-control"
              placeholder="New password"
              value={newPassword}
              required
            />
          </div>

          <Link className="btn btn-primary btn-md" to='#' onClick={submit}>
            {btnLabel}
          </Link>

        </form>
      </div>
    </div>
  );
  return (
    <Layout>
      <div className="container-reset-password">
        <h1 className="text-center">
          Password resetting
        </h1>
        {passwordResetForm()}
      </div>
    </Layout>
  );
};

export default Reset;
