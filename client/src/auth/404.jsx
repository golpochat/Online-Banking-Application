import React from "react";

import Layout from "../layout/common/Layout";
import './Auth.css'

const UnauthorisedAccess = () => {
  return (
    <Layout>
      <div className="container-not-found bg-success text-white">
        <h1 className="text-center">Not found!</h1>
        <h3 className="text-center">Sorry, we couldn't find what you are looking for.</h3>
      </div>
    </Layout>
  );
};

export default UnauthorisedAccess;
