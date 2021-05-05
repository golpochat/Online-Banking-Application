import React, { Fragment } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import NabBar from "./NavBar";
import Footer from "../../footer/components/Footer";

const Layout = ({ children }) => {
  return (
    <Fragment>
      <NabBar />
      <main className="container">{children}
        <ToastContainer />
      </main>
      <Footer />
    </Fragment>
  );
};

export default Layout;
