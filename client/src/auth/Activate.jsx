import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import Layout from "../layout/common/Layout";
import './Auth.css'

const Activate = ({ match, history }) => {
  const [values, setValues] = useState({
    token: "",
  });

  const { token } = values;
  useEffect(() => {
    // console.log("Check useEfect");
    const token = match.params.token;

    if (token) {
      setValues({ ...values, token });
    }
  }, []);

  const doSubmit = (event) => {
    event.preventDefault();
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/auth/activation`,
      data: { token },
    })
      .then((response) => {
        console.log("ACTIVATION SUCCESSFULL", response);
        setValues({
          ...values,
          show: false,
        });
        toast.success(response.data.message);
        history.push('/login');
      })
      .catch((error) => {
        console.log("ACTIVATION ERROR", error.response.data.error);
        toast.error(error.response.data.error);
        // history.push('/');
      });
  };
  const activationLink = () => (
    <div className="row">
      <div className="col-sm-12 col-md-6 col-lg-6 m-auto">
        <h5>Click the button to activate your account.</h5>
        <hr />
        <Link className="btn btn-outline-success" to="#" onClick={doSubmit}>
          Activate now
        </Link>
      </div>
    </div>
  );
  return (
    <Layout>
      <div className="container-activation">
        <h1 className="text-center">Activate Account</h1>
        <hr />
        {activationLink()}
      </div>
    </Layout>
  );
};

export default Activate;
