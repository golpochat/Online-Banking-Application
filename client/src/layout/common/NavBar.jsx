import React, { Fragment } from "react";
import { Link, NavLink } from "react-router-dom";

import { isAuth, logout, isAdmin, isCustomer } from "../../auth/AuthHelper";
import AdminMenu from "../adminLayout/AdminMenu";
import './Navbar.css'

const NavBar = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <Link className="navbar-brand" to="/">
          OBA
        </Link>
        <Link
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          to="#"
        >
          <span className="navbar-toggler-icon" />
        </Link>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav">

            {/* Admin section */}
            {isAuth() && isAdmin() && <AdminMenu />}

            {/* end of Admin section */}
          </ul>
          <ul className="nav navbar-nav ml-auto">
            {
              /* if the user is logged in user then show the profile else show sign-in and sign-up links */
              isAuth() ? (
                <Fragment>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      to="#"
                      id="navbarDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {isAdmin() ? "Admin" : "My profile"}
                    </NavLink>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >{isAdmin() &&
                      <Link className="dropdown-item" to={`/customer/admin-profile`}>
                        View profile
                      </Link>
                      }{isCustomer() &&
                        <Link className="dropdown-item" to={`/customer/profile`}>
                          View profile
                      </Link>}
                      {isAdmin() ?
                        <Link className="dropdown-item" to={`/user/update-admin-password`}>
                          Change password
                      </Link>
                        :
                        <Link className="dropdown-item" to={`/user/update-customer-password`}>
                          Change password
                      </Link>
                      }
                      <Link className="dropdown-item" to="/login" onClick={() => logout()} >
                        Logout
                      </Link>
                    </div>
                  </li>
                </Fragment>
              ) : (
                <Fragment>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/signup">
                      Signup
                  </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login">
                      Login
                  </NavLink>
                  </li>
                </Fragment>
              )
            }
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
