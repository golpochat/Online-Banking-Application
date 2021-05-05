import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify"
import 'react-datepicker/dist/react-datepicker.css'

import Layout from "../../layout/common/Layout";
import { isAuth, getCookie } from "../../auth/AuthHelper";
import './Account.css'

const CreateAccount = ({ history, match }) => {
    const [values, setValues] = useState({
        type: "",
        accountName: "",
        accountNumber: "",
        sortcode: "",
        iban: "",
        bic: "",
        btnLabel: "Create account",
    });
    const token = getCookie("token");
    const {
        type,
        accountName,
        accountNumber,
        sortcode,
        iban,
        bic,
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
            url: `${process.env.REACT_APP_API}/account/create/${match.params.id}`,
            headers: { Authorization: `Bearer ${token}` },
            data: {
                type,
                accountName,
                accountNumber,
                sortcode,
                iban,
                bic,
            }
        })
            .then((response) => {
                // console.log("PLAYER PROFILE CREATE SUCCESSFULL", response);
                toast.success(response.data.message);
                history.push(`/${isAuth().role}/profile`);
            })
            .catch((error) => {
                // console.log("PLAYER PROFILE CREATE ERROR", error.response.data.error);
                setValues({ ...values, btnLabel: "Create" });
                // toast.error('Error in creating profile, try again.');
                toast.error(error.response.data.error);
            });
    };

    const accountForm = () => (
        <div className="row">
            <div className="col-sm-12 col-md-6 col-lg-6 m-auto">
                <form>
                    <div className="form-group">
                        <label className="text-muted">Type</label>
                        <select className="form-control" name="type" value={type} onChange={handleChange("type")}>
                            <option key="select" value="">Select account type</option>
                            <option key="Current" value="Current">Current</option>
                            <option key="Saving" value="Saving">Saving</option>
                        </select>

                    </div>
                    <div className="form-group">
                        <label className="text-muted">Account name</label>
                        <input
                            onChange={handleChange("accountName")}
                            type="text"
                            className="form-control"
                            value={accountName}
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
                    <Link to="#" className="btn btn-primary btn-md" onClick={doSubmit} >
                        {btnLabel}
                    </Link>
                </form>
            </div>
        </div>
    );
    return (
        <Layout>
            <div className="container-payee-create">
                <h1 className="text-center">Creating account</h1>
                <hr />
                {accountForm()}
            </div>
        </Layout>
    );
};

export default CreateAccount;
