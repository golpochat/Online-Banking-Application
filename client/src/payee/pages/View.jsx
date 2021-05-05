import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import * as moment from 'moment'
import { toast } from "react-toastify"

import Layout from "../../layout/common/Layout";
import { getCookie } from "../../auth/AuthHelper";
import './Payee.css'

const ViewPayee = ({ match }) => {
    const [values, setValues] = useState([]);
    const token = getCookie("token");
    useEffect(() => {
        loadPayee();
    }, []);

    const loadPayee = () => {
        axios({
            method: "GET",
            url: `${process.env.REACT_APP_API}/payee/read/${match.params.id}`,
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                // console.log("PAYEE LOADED", response);
                const {
                    payeeName,
                    bankName,
                    sortcode,
                    accountNumber,
                    iban,
                    bic,
                } = response.data;
                setValues({
                    ...values,
                    payeeName,
                    bankName,
                    sortcode,
                    accountNumber,
                    iban,
                    bic,
                    btnLabel: "Update",
                });
                toast.success(response.data.message);
            })
            .catch((error) => {
                setValues({ ...values, btnLabel: "Update" });
                toast.error(error.response.data.error);
            });
    };
    const profileInfo = () => (
        <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 m-auto">
                <table className="table">
                    <tbody>
                        <tr>
                            <td>Payee name</td>
                            <td>{values.payeeName}</td>
                        </tr>
                        <tr>
                            <td>Bank name</td>
                            <td>{values.bankName}</td>
                        </tr>
                        <tr>
                            <td>Account no</td>
                            <td>{values.accountNumber}</td>
                        </tr>
                        <tr>
                            <td>Sortcode</td>
                            <td>{values.sortcode}</td>
                        </tr>
                        <tr>
                            <td>BIC</td>
                            <td>{values.bic}</td>
                        </tr>
                        <tr>
                            <td>IBAN</td>
                            <td>{values.iban}</td>
                        </tr>
                        <tr>
                            <td>Updated</td>
                            <td>{moment(values.updatedAt).format("dddd, MMMM Do YYYY, h:mm:ss a")}</td>
                        </tr>
                        <tr>
                            <td>Created</td>
                            <td>{moment(values.createdAt).format("dddd, MMMM Do YYYY, h:mm:ss a")}</td>
                        </tr>
                    </tbody>
                </table>
                <div className="text-center">
                    <Link className="btn btn-success btn-md mr-2" to={`/customer/profile`}>Back to profile</Link>
                    <Link className="btn btn-warning btn-md" to={`/payee/update/${match.params.id}`}>Edit</Link>
                </div>
            </div>
        </div >
    );

    return (
        <Layout>
            <div className="container-payee-view">
                <h1 className="text-center">Payee detail view</h1>
                {profileInfo()}
            </div>
        </Layout>
    );
};

export default ViewPayee;
