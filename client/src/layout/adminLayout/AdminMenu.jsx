import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <Fragment>
      <li className="nav-item">
        <NavLink className="nav-link" to={`/transaction/list`}>
          Transactions
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to={`/customer/list`}>
          Customers
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to={`/user/list`}>
          Users
        </NavLink>
      </li>
    </Fragment>
  );
};

export default AdminMenu;
