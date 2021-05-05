import React, { useState } from "react";
import Layout from "../layout/common/Layout";
import axios from "axios";
import { toast } from "react-toastify";


const Forgot = ({ history }) => {
  const [values, setValues] = useState({
    // email: "sujanhossain313@gmail.com",
    // btnLabel: "Send the link to reset my password",

    email: "",
    btnLabel: "Send the link to reset my password",
  });

  const { email, btnLabel } = values;
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  const submit = (event) => {
    event.preventDefault();
    setValues({ ...values, btnLabel: "Sending" });
    axios({
      method: "PUT",
      // url: `${process.env.REACT_APP_API}/signin`,
      url: `${process.env.REACT_APP_API}/auth/forgot-password`,
      data: { email },
    })
      .then((response) => {
        console.log("FORGOT PASSWORD SUCCESS", response);

        toast.success(response.data.message);
        setValues({ ...values, btnLabel: "Sent" });
        // history.push('/login');
      })
      .catch((error) => {
        console.log("FORGOT PASSWORD ERROR", error.response.data);
        setValues({
          ...values,
          btnLabel: "Send the link to reset my password",
        });
        toast.error(error.response.data.error);
      });
  };

  const passwordForgotForm = () => (
    <div className="row">
      <div className="col-sm-12 col-md-6 col-lg-6">
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

          <button className="btn btn-info btn-md" onClick={submit}>
            {btnLabel}
          </button>
        </form>
      </div>
    </div>
  );
  return (
    <Layout>
      <div className="container-forgot-password">
        <h1 className="text-center">Send me the password resetting link</h1>
        {passwordForgotForm()}
      </div>
    </Layout>
  );
};

export default Forgot;
