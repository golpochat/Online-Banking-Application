import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import * as moment from 'moment'

import { isAuth, getCookie } from "../../auth/AuthHelper";
import Layout from "../../layout/common/Layout";
import './Customer.css';


const Profile = ({ history }) => {
    const token = getCookie("token");
    const [values, setValues] = useState([]);
    const [userId, setUserId] = useState([]);
    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = () => {
        axios({
            method: "GET",
            url: `${process.env.REACT_APP_API}/customer/read/${isAuth().id}`,
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((profile) => {
                // console.log(profile)
                const {
                    firstName,
                    lastName,
                    address,
                    mobile,
                    dob,
                    email,
                    status
                } = profile.data;
                const { role, id } = profile.data.user;
                setUserId(id)
                setValues({
                    role,
                    email,
                    firstName,
                    lastName,
                    address,
                    mobile,
                    dob,
                    status
                });
            })
            .catch(() => {
                // console.log("PLAYER PROFILE UPDATE ERROR", error);
                history.push(`/customer/create`);
            });
    };

    const profileInfo = () => (
        <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-6 m-auto table-responsive">
                <table className="table mt-3">
                    <tbody>
                        <tr>
                            <td>Role</td>
                            <td>{values.role}</td>
                        </tr>
                        <tr>
                            <td>Address</td>
                            <td>{values.address}</td>
                        </tr>
                        <tr>
                            <td>Contact number</td>
                            <td>{values.mobile}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>{values.email}</td>
                        </tr>
                        <tr>
                            <td>Date of birth</td>
                            <td>{moment(values.dob).format('DD-MM-YYYY')}</td>
                        </tr>
                    </tbody>
                </table>
                <Link to={`/customer/update-admin-profile`} className="btn btn-block btn-warning btn-md mt-3 text-success">Update profile</Link>
            </div>
        </div >
    );

    return (
        <Layout>
            <div className="container-profile">
                <h1 className="text-lead text-center">{`${values.firstName} ${values.lastName}`}</h1>
                <hr />
                {profileInfo()}
            </div>
        </Layout>
    );
};

export default Profile;
