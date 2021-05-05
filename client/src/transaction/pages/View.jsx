import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import * as moment from 'moment'
import { toast } from "react-toastify"

import Layout from "../../layout/common/Layout";
import { getCookie } from "../../auth/AuthHelper";
import './Transaction.css'

const ViewTransaction = ({ match }) => {
    const [transaction, setTransaction] = useState([]);
    const [payee, setPayee] = useState([]);
    const [customer, setCustomer] = useState([]);
    const token = getCookie("token");
    useEffect(() => {
        loadTransaction();
    }, []);

    const loadTransaction = () => {
        axios({
            method: "GET",
            url: `${process.env.REACT_APP_API}/transaction/read/${match.params.id}`,
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                console.log("TRANSACTION LOADED", response.data);
                setTransaction(response.data);
                setPayee(response.data.payee);
                setCustomer(response.data.customer);
                toast.success(response.data.message);
            })
            .catch((error) => {
                toast.error(error.response.data.error);
            });
    };

    const transactionInfo = () => (
        <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 m-auto">
                <table className="table">
                    <tbody>
                        <tr>
                            <td>Sender</td>
                            <td><Link to={`/customer/profile`}>{customer.firstName + " " + customer.lastName}</Link></td>
                        </tr>
                        <tr>
                            <td>Receiver</td>
                            <td><Link to={`/payee/view/${payee.id}`}>{payee.payeeName}</Link></td>
                        </tr>
                        <tr>
                            <td>Account</td>
                            <td>{payee.accountNumber}</td>
                        </tr>
                        <tr>
                            <td>Sortcode</td>
                            <td>{payee.sortcode}</td>
                        </tr>
                        <tr>
                            <td>BIC</td>
                            <td>{payee.bic}</td>
                        </tr>
                        <tr>
                            <td>IBAN</td>
                            <td>{payee.iban}</td>
                        </tr>
                        <tr>
                            <td><strong>Amount sent</strong></td>
                            <td><strong>€{transaction.amount}</strong></td>
                        </tr>
                        <tr>
                            <td>Reference</td>
                            <td>{transaction.reference}</td>
                        </tr>
                        <tr>
                            <td>Status</td>
                            <td>{transaction.status}</td>
                        </tr>
                        <tr>
                            <td>Updated</td>
                            <td>{moment(transaction.updatedAt).format("dddd, MMMM Do YYYY, h:mm:ss a")}</td>
                        </tr>
                        <tr>
                            <td>Created</td>
                            <td>{moment(transaction.createdAt).format("dddd, MMMM Do YYYY, h:mm:ss a")}</td>
                        </tr>
                    </tbody>
                </table>
                <div className="text-center">
                    <Link className="btn btn-success btn-md mr-2" to={`/customer/profile`}>Back to profile</Link>
                </div>
            </div>
        </div >
    );

    return (
        <Layout>
            <div className="container-payee-view">
                <h1 className="text-center">Transaction detail view</h1>
                {transactionInfo()}
            </div>
        </Layout>
    );
};

export default ViewTransaction;
