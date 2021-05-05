import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import axios from "axios";
import { toast } from "react-toastify";

import { getCookie } from "../../auth/AuthHelper";
import Layout from "../../layout/common/Layout";
import './Customer.css'


const UpdateProfile = ({ history, match }) => {
    const [values, setValues] = useState({
        firstName: "",
        lastName: "",
        address: "",
        mobile: "",
        email: "",
        status: "",
        btnLabel: "Update",
    });
    const [userId, setUserId] = useState([]);
    const [dob, setDOB] = useState(new Date());
    const token = getCookie("token");
    useEffect(() => {
        loadProfile();
    }, []);
    // console.log(match.params.id)
    const loadProfile = () => {
        axios({
            method: "GET",
            url: `${process.env.REACT_APP_API}/customer/read/${match.params.id}`,
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                console.log("CUSTOMER PROFILE LOADED", response);
                const {
                    firstName,
                    lastName,
                    address,
                    mobile,
                    email,
                    status,
                } = response.data;
                setUserId(response.data.id)
                setDOB(response.data.dob)
                setValues({
                    ...values,
                    firstName,
                    lastName,
                    address,
                    mobile,
                    email,
                    status,
                    btnLabel: "Update",
                });
                toast.success(response.data.message);
            })
            .catch((error) => {
                // console.log("PLAYER PROFILE UPDATE ERROR", error.response.data.error);
                setValues({ ...values, btnLabel: "Update" });
                toast.error(error.response.data.error);
            });
    };

    const {
        firstName,
        lastName,
        address,
        mobile,
        email,
        status,
        btnLabel
    } = values;
    const handleChange = (name) => (event) => {
        setValues({ ...values, [name]: event.target.value });
    };
    const doSubmit = (event) => {
        event.preventDefault();

        setValues({ ...values, btnLabel: "Updating" });
        axios({
            method: "PUT",
            url: `${process.env.REACT_APP_API}/customer/update/${userId}`,
            headers: { Authorization: `Bearer ${token}` },
            data: {
                firstName,
                lastName,
                address,
                mobile,
                email,
                status,
                dob
            }
        })
            .then((response) => {
                // console.log("PLAYER PROFILE UPDATE", response);
                toast.success(response.data.message);
                history.push(`/customer/admin-profile`);
            })
            .catch((error) => {
                console.log("PLAYER PROFILE UPDATE ERROR", error.response.data.error);
                setValues({ ...values, btnLabel: "Update" });
                // toast.error('Error in updating profile, try again later.');
                toast.error(error.response.data.error);
            });
    };

    const updateFrom = () => (
        <div className="row">
            <div className="col-sm-12 col-md-6 col-lg-6 m-auto">
                <form>
                    <div className="form-group">
                        <label className="text-muted">First name</label>
                        <input
                            onChange={handleChange("firstName")}
                            type="text"
                            className="form-control"
                            value={firstName}
                        />
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Last name</label>
                        <input
                            onChange={handleChange("lastName")}
                            type="text"
                            className="form-control"
                            value={lastName}
                        />
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Email</label>
                        <input
                            onChange={handleChange("email")}
                            type="email"
                            className="form-control"
                            value={email}
                        />
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Address</label>
                        <input
                            onChange={handleChange("address")}
                            type="text"
                            className="form-control"
                            value={address}
                        />
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Contact number</label>
                        <input
                            onChange={handleChange("mobile")}
                            type="text"
                            className="form-control"
                            value={mobile}
                        />
                    </div>
                    <div className="form-group">
                        <div className="text-muted">Date of birth</div>
                        <DatePicker
                            className="form-control"
                            selected={new Date(dob)}
                            onChange={dob_date => setDOB(dob_date)}
                            showMonthDropdown
                            showYearDropdown
                            dateFormat="dd-MM-yyyy"
                            maxDate={new Date()}
                            dropdownMode="select"
                        />
                    </div>

                    <Link className="btn btn-success btn-md mr-2" to={`/customer/admin-profile`}>Back to profile</Link>
                    <Link to="#" className="btn btn-primary btn-md" onClick={doSubmit} >
                        {btnLabel}
                    </Link>
                </form>
            </div>
        </div>
    );
    return (
        <Layout>
            <div className="container-update-customer">
                <h1 className="text-center">Updating profile</h1>
                <hr />
                {updateFrom()}
            </div>
        </Layout>
    );
};

export default UpdateProfile;
