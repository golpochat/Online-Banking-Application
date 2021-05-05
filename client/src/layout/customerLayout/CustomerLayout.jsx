import React, { useState, useEffect } from "react";
import Layout from "../common/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import { isAuth, getCookie, logout, updateUser } from "../../auth/AuthHelper";

const CustomerLayout = ({ history }) => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        role: "",
        password: "",
        btnLabel: "Update",
    });
    const token = getCookie("token");

    useEffect(() => {
        loadProfile();
    });

    const loadProfile = () => {
        axios({
            method: "GET",
            url: `${process.env.REACT_APP_API}/user/${isAuth()._id}`,
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                console.log("CUSTOMER PROFILE UPDATE", response);
                const { role, name, email } = response.data;
                setValues({
                    ...values,
                    role,
                    name,
                    email,
                    btnLabel: "Update",
                });
                toast.success(response.data.message);
            })
            .catch((error) => {
                console.log("CUSTOMER PROFILE UPDATE ERROR", error.response.data.error);
                if (error.response.status === 401) {
                    logout(() => {
                        history.push("/login");
                    });
                }
                setValues({ ...values, btnLabel: "Update" });
                toast.error(error.response.data.error);
            });
    };

    const { name, email, password, role, btnLabel } = values;
    const handleChange = (name) => (event) => {
        setValues({ ...values, [name]: event.target.value });
    };
    const submit = (event) => {
        event.preventDefault();
        setValues({ ...values, btnLabel: "Updating" });
        axios({
            method: "PUT",
            url: `${process.env.REACT_APP_API}/user/update`,
            headers: { Authorization: `Bearer ${token}` },
            data: { name, password },
        })
            .then((response) => {
                console.log("CUSTOMER PROFILE UPDATE SUCCESSFULL", response);
                updateUser(response, () => {
                    setValues({
                        ...values,
                        btnLabel: "Updated",
                    });
                    toast.success("Customer profile updated successfully.");
                });
            })
            .catch((error) => {
                console.log("CUSTOMER PROFILE UPDATE ERROR", error.response.data.error);
                setValues({ ...values, btnLabel: "Update" });
                toast.error(error.response.data.error);
            });
    };

    const updateFrom = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input
                    onChange={handleChange("name")}
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    value={name}
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input
                    type="email"
                    className="form-control"
                    placeholder="Email address"
                    defaultValue={email}
                    disabled
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Role</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Role"
                    defaultValue={role}
                    disabled
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
            <button className="btn btn-primary btn-md" onClick={submit}>
                {btnLabel}
            </button>
        </form>
    );
    return (
        <Layout>
            <div className="col-md-6 offset-md-3">
                <h1 className="mt-5 text-center">Update Customer Profile</h1>
                {updateFrom()}
            </div>
        </Layout>
    );
};

export default CustomerLayout;
