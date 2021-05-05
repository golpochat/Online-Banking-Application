import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify"

import Layout from "../../layout/common/Layout";
import { getCookie } from "../../auth/AuthHelper";
import './Transaction.css'

const CreateTransaction = ({ history, match }) => {
    const [values, setValues] = useState({
        amount: "",
        description: "",
        reference: "",
        payeeId: "",
        btnLabel: "Make transaction",
    });
    const token = getCookie("token");
    const {
        amount,
        description,
        reference,
        payeeId,
        btnLabel
    } = values;
    const handleChange = (name) => (event) => {
        setValues({ ...values, [name]: event.target.value });
    };
    const doSubmit = (event) => {
        event.preventDefault();

        setValues({ ...values, btnLabel: "Making transaction" });
        axios({
            method: "POST",
            url: `${process.env.REACT_APP_API}/transaction/create/${match.params.id}`,
            headers: { Authorization: `Bearer ${token}` },
            data: {
                amount,
                description,
                reference,
                payeeId,
            }
        })
            .then((response) => {
                console.log("PLAYER PROFILE CREATE SUCCESSFULL", response);
                toast.success(response.data.message);
                history.push(`/customer/profile`);
            })
            .catch((error) => {
                // console.log("PLAYER PROFILE CREATE ERROR", error.response.data.error);
                setValues({ ...values, btnLabel: "Make transaction" });
                // toast.error('Error in creating profile, try again.');
                toast.error(error.response.data.error);
            });
    };

    const transactionForm = () => (
        <div className="row">
            <div className="col-sm-12 col-md-6 col-lg-6 m-auto">
                <form>
                    <div className="form-group">
                        <label className="text-muted">Amount</label>
                        <input
                            onChange={handleChange("amount")}
                            type="text"
                            className="form-control"
                            placeholder="An amount to be sent"
                            value={amount}
                        />
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Description</label>
                        <input
                            onChange={handleChange("description")}
                            type="text"
                            className="form-control"
                            placeholder="A message for yourself"
                            value={description}
                        />
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Reference</label>
                        <input
                            onChange={handleChange("reference")}
                            type="text"
                            className="form-control"
                            placeholder="A message for the payee"
                            defaultValue={reference}
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
            <div className="container-transaction-create">
                <h1 className="text-center">Creating trnasaction</h1>
                <hr />
                {transactionForm()}
            </div>
        </Layout>
    );
};

export default CreateTransaction;
