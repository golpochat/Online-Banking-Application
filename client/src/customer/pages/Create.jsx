import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import Layout from "../../layout/common/Layout";
import { isAuth, getCookie } from "../../auth/AuthHelper";
import './Customer.css'

const CreateProfile = ({ history }) => {
    const [values, setValues] = useState({
        firstName: "",
        lastName: "",
        address: "",
        mobile: "",
        email: "",
        btnLabel: "Create profile",
    });
    const [dob, setDOB] = useState(new Date());
    const token = getCookie("token");
    const {
        firstName,
        lastName,
        address,
        mobile,
        email,
        btnLabel
    } = values;
    const handleChange = (name) => (event) => {
        setValues({ ...values, [name]: event.target.value });
    };
    const doSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, btnLabel: "Creating" });
        axios({
            method: "POST",
            url: `${process.env.REACT_APP_API}/customer/create`,
            headers: { Authorization: `Bearer ${token}` },
            data: {
                firstName,
                lastName,
                address,
                mobile,
                email,
                dob,
            },
        })
            .then((response) => {
                console.log("CUSTOMER PROFILE CREATE SUCCESSFULL", response);
                toast.success(response.data.message);
                history.push(`/${isAuth().role}/profile`);
            })
            .catch((error) => {
                console.log("CUSTOMER PROFILE CREATE ERROR", error.response.data.error);
                setValues({ ...values, btnLabel: "Create profile" });
                // toast.error('Error in creating profile, try again.');
                toast.error(error.response.data.error);
            });
    };

    const profileForm = () => (
        <div className="row">
            <div className="col-sm-12 col-md-6 col-lg-6 m-auto">
                <form>
                    <div className="form-group">
                        <label className="text-muted">First name</label>
                        <input
                            onChange={handleChange("firstName")}
                            type="text"
                            className="form-control"
                            placeholder="Last name"
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
                            selected={dob}
                            onChange={dob_date => setDOB(dob_date)}
                            showMonthDropdown
                            showYearDropdown
                            dateFormat="dd-MM-yyyy"
                            maxDate={new Date()}
                            dropdownMode="select"
                        />
                    </div>

                    <Link to="#" className="btn btn-primary btn-md" onClick={doSubmit} >
                        {btnLabel}
                    </Link>
                </form>
            </div>
        </div >
    );
    return (
        <Layout>
            <div className="container-create-customer">
                <h1 className="text-center">Creating customer profile</h1>
                <hr />
                {profileForm()}
            </div>
        </Layout>
    );
};

export default CreateProfile;
