import React from "react";

import Layout from "../layout/common/Layout";
import './Auth.css'

const UnauthorisedAccess = () => {
  return (
    <Layout>
      <div className="container-unauthorised-access bg-danger text-white">
        <h1 className="text-center">Unauthorised access!</h1>
        <h3 className="text-center">You are certainly not authorised to access this location.</h3>
      </div>
    </Layout>
  );
};

export default UnauthorisedAccess;
