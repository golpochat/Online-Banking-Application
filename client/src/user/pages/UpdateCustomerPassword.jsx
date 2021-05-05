import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import Layout from "../../layout/common/Layout";
import { isAuth, getCookie } from "../../auth/AuthHelper";
import './User.css'

const UpdateUser = ({ history }) => {
    const [values, setValues] = useState({
        password: "",
        confirm_password: "",
        btnLabel: "Changing password",
    });
    const token = getCookie("token");
    const {
        password,
        confirm_password,
        btnLabel
    } = values;
    const handleChange = (name) => (event) => {
        setValues({ ...values, [name]: event.target.value });
    };
    const doSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, btnLabel: "Changing" });
        axios({
            method: "PUT",
            url: `${process.env.REACT_APP_API}/user/update`,
            headers: { Authorization: `Bearer ${token}` },
            data: {
                password,
                confirm_password,
            },
        })
            .then((response) => {
                // console.log("USER PASSWORD UPDATED SUCCESSFULLY", response);
                toast.error(response.data.message);
                history.push(`/${isAuth().role}/profile`);
            })
            .catch((error) => {
                // console.log("PLAYER PROFILE CREATE ERROR", error.response.data.error);
                setValues({ ...values, btnLabel: "Password changed" });
                toast.error(error.response.data.error);
            });
    };

    const updateUserForm = () => (
        <div className="row">
            <div className="col-sm-12 col-md-6 col-lg-6 m-auto">
                <form>
                    <div className="form-group">
                        <label className="text-muted">Password</label>
                        <input
                            onChange={handleChange('password')}
                            type="password"
                            className="form-control"
                            value={password}
                            required
                            autoComplete="off"
                        />
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Confirm-password</label>
                        <input
                            onChange={handleChange('confirm_password')}
                            type="password"
                            className="form-control"
                            value={confirm_password}
                            required
                            autoComplete="off"
                        />
                    </div>
                    <Link className="btn btn-primary btn-md mr-3" to={`/${isAuth().role}/profile`} >
                        Back to profile
                    </Link>
                    <Link className="btn btn-warning btn-md" to="#" onClick={doSubmit}>
                        {btnLabel}
                    </Link>
                </form>
            </div>
        </div>
    );
    return (
        <Layout>
            <div className="container-user-update">
                <h1 className="text-center">Change password</h1>
                {updateUserForm()}
            </div>
        </Layout>
    );
};

export default UpdateUser;
