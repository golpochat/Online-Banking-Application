import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify"
import 'react-datepicker/dist/react-datepicker.css'

import Layout from "../../layout/common/Layout";
import { getCookie } from "../../auth/AuthHelper";
import './Account.css'


const UpdatePayee = ({ history, match }) => {
    const [values, setValues] = useState({
        payeeName: "",
        bankName: "",
        sortcode: "",
        accountNumber: "",
        iban: "",
        bic: "",
        btnLabel: "Update",
    });
    const token = getCookie("token");
    useEffect(() => {
        loadProfile();
    }, []);
    // console.log(match.params.id)
    const loadProfile = () => {
        axios({
            method: "GET",
            url: `${process.env.REACT_APP_API}/payee/read/${match.params.id}`,
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                console.log("CUSTOMER PROFILE LOADED", response);
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
                // console.log("PLAYER PROFILE UPDATE ERROR", error.response.data.error);
                setValues({ ...values, btnLabel: "Update" });
                toast.error(error.response.data.error);
            });
    };

    const {
        payeeName,
        bankName,
        sortcode,
        accountNumber,
        iban,
        bic,
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
            url: `${process.env.REACT_APP_API}/payee/update/${match.params.id}`,
            headers: { Authorization: `Bearer ${token}` },
            data: {
                payeeName,
                bankName,
                sortcode,
                accountNumber,
                iban,
                bic,
            }
        })
            .then((response) => {
                // console.log("PLAYER PROFILE UPDATE", response);
                toast.success(response.data.message);
                history.push(`/customer/profile`);
            })
            .catch((error) => {
                console.log("PAYEE UPDATE ERROR", error.response.data.error);
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
                        <label className="text-muted">Payee name</label>
                        <input
                            onChange={handleChange("payeeName")}
                            type="text"
                            className="form-control"
                            value={payeeName}
                        />
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Bank name</label>
                        <input
                            onChange={handleChange("bankName")}
                            type="text"
                            className="form-control"
                            value={bankName}
                        />
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Account number</label>
                        <input
                            onChange={handleChange("accountNumber")}
                            type="text"
                            className="form-control"
                            defaultValue={accountNumber}
                        />
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Sortcode</label>
                        <input
                            onChange={handleChange("sortcode")}
                            type="text"
                            className="form-control"
                            value={sortcode}
                        />
                    </div>
                    <div className="form-group">
                        <label className="text-muted">BIC</label>
                        <input
                            onChange={handleChange("bic")}
                            type="text"
                            className="form-control"
                            defaultValue={bic}
                        />
                    </div>
                    <div className="form-group">
                        <label className="text-muted">IBAN</label>
                        <input
                            onChange={handleChange("iban")}
                            type="text"
                            className="form-control"
                            defaultValue={iban}
                        />
                    </div>
                    <Link className="btn btn-success btn-md mr-2" to={`/customer/profile`}>Back to profile</Link>
                    <Link className="btn btn-warning btn-md mr-2" to={`/payee/update/${match.params.id}`}>Edit</Link>
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
                <h1 className="text-center">Updating payee</h1>
                <hr />
                {updateFrom()}
            </div>
        </Layout>
    );
};

export default UpdatePayee;
