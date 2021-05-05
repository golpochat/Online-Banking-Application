import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify"
import 'react-datepicker/dist/react-datepicker.css'

import Layout from "../../layout/common/Layout";
import { isAuth, getCookie } from "../../auth/AuthHelper";
import './Payee.css'

const CreatePayee = ({ history, match }) => {
    const [values, setValues] = useState({
        payeeName: "",
        bankName: "",
        sortcode: "",
        accountNumber: "",
        iban: "",
        bic: "",
        btnLabel: "Create payee",
    });
    const token = getCookie("token");
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

        setValues({ ...values, btnLabel: "Creating" });
        axios({
            method: "POST",
            url: `${process.env.REACT_APP_API}/payee/create/${match.params.id}`,
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

    const payeeForm = () => (
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
                <h1 className="text-center">Creating payee</h1>
                <hr />
                {payeeForm()}
            </div>
        </Layout>
    );
};

export default CreatePayee;
