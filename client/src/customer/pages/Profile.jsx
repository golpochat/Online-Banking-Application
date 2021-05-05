import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import * as moment from 'moment'

import Pagination from "../../shared/pagination/Pagination";
import { isAuth, getCookie } from "../../auth/AuthHelper";
import Layout from "../../layout/common/Layout";
import paginate from "../../auth/paginate";
import './Customer.css'


const Profile = ({ history }) => {
    const token = getCookie("token");
    const [payeeList, setPayeeList] = useState([]);
    const [transactionList, setTransactionList] = useState([]);
    const [accountReceivableList, setAccountReceivableList] = useState([]);
    const [account, setAccount] = useState([]);
    const [values, setValues] = useState([]);
    const [customerId, setCustomerId] = useState([]);

    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = 10

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
                // console.log(profile.data);
                const { id,
                    firstName,
                    lastName,
                    address,
                    mobile,
                    dob,
                    status
                } = profile.data;
                setCustomerId(id);
                const { role, email } = profile.data.user;
                setValues({
                    role,
                    firstName,
                    lastName,
                    address,
                    mobile,
                    dob,
                    email,
                    status
                });
                // to load account
                axios({
                    method: "GET",
                    url: `${process.env.REACT_APP_API}/account/view/${profile.data.id}`,
                    headers: { Authorization: `Bearer ${token}` },
                })
                    .then((response) => {
                        // console.log("FOUND AN ACCOUNT", response.data);
                        setAccount(response.data);
                        toast.success(response.data.message);

                        // to load all the transactions by the account
                        axios({
                            method: "GET",
                            url: `${process.env.REACT_APP_API}/transaction/listByAccount/${response.data.accountNumber}`,
                            headers: { Authorization: `Bearer ${token}` },
                        })
                            .then((response) => {
                                // console.log("FOUND TRANSACTION LIST BY ACCOUNT", response.data);
                                setAccountReceivableList(response.data)
                                toast.success(response.data.message);
                            })
                            .catch((error) => {
                                // console.log("PAYEE LOADING ERROR", error.response.data.error);
                                toast.error(error.response.data.error);
                            });

                    })
                    .catch((error) => {
                        // console.log("PAYEE LOADING ERROR", error.response.data.error);
                        toast.error(error.response.data.error);
                    });

                // to load all the payees
                axios({
                    method: "GET",
                    url: `${process.env.REACT_APP_API}/payee/list/${profile.data.id}`,
                    headers: { Authorization: `Bearer ${token}` },
                })
                    .then((response) => {
                        // console.log("FOUND PAYEE LIST", response.data);
                        setPayeeList(response.data)
                        toast.success(response.data.message);
                    })
                    .catch((error) => {
                        // console.log("PAYEE LOADING ERROR", error.response.data.error);
                        toast.error(error.response.data.error);
                    });

                // to load all the transactions by the customer
                axios({
                    method: "GET",
                    url: `${process.env.REACT_APP_API}/transaction/listByCustomer/${profile.data.id}`,
                    headers: { Authorization: `Bearer ${token}` },
                })
                    .then((response) => {
                        // console.log("FOUND TRANSACTION LIST", response.data);
                        setTransactionList(response.data)
                        toast.success(response.data.message);
                    })
                    .catch((error) => {
                        // console.log("PAYEE LOADING ERROR", error.response.data.error);
                        toast.error(error.response.data.error);
                    });

            })
            .catch(() => {
                // console.log("CUSTOMER PROFILE UPDATE ERROR", error);
                history.push(`/customer/create`);
            });
    };
    const handlePageChange = (page) => {
        setCurrentPage(page)
    };

    const payees = paginate(payeeList, currentPage, pageSize);
    const transactions = paginate(transactionList, currentPage, pageSize);

    // calculation
    const accountsPayable = transactionList.reduce((result, transaction) => result + transaction.amount, 0)
    const accountsReceivable = accountReceivableList.reduce((result, receivable) => result + receivable.amount, 0)
    const balance = accountsReceivable - accountsPayable;
    // end of calculation

    const profileInfo = () => (
        <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-6 m-auto table-responsive">
                <table className="table mt-3">
                    <tbody>
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
                        <tr>
                            <td>Status</td>
                            <td>{values.status ? 'Active' : 'Inactive'}</td>
                        </tr>
                    </tbody>
                </table>
                <Link to={`/customer/update`} className="btn btn-block btn-warning btn-md mt-3 text-success">Update profile</Link>
            </div>
        </div >
    );

    const histry = () => (
        <div className="row">
            <div className="col-md-12">
                <div className="bd-example bd-example-tabs">
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" id="account-tab" data-toggle="tab" href="#account" role="tab" aria-controls="account" aria-selected="true">Account</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="payee-tab" data-toggle="tab" href="#payee" role="tab" aria-controls="payee" aria-selected="false">Payee</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="transaction-tab" data-toggle="tab" href="#transaction" role="tab" aria-controls="transaction" aria-selected="false">Transaction</a>
                        </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade show active" id="account" role="tabpanel" aria-labelledby="account-tab">
                            <div className="row mt-5">
                                <div className="col-3"><h5>Account: {account.accountNumber}</h5></div>
                                <div className="col-3"><h5>Sortcode: {account.sortcode}</h5></div>
                                <div className="col-2"><h5>BIC: {account.bic}</h5></div>
                                <div className="col-4"><h5>IBAN: {account.iban}</h5></div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-6">
                                    {!account.id &&
                                        <h5>
                                            <Link to={`/account/create/${customerId}`} className="btn btn-primary btn-lg">Add new account</Link>
                                        </h5>
                                    }
                                </div>
                                <div className="col-6 text-right"><h1>Balance: €{balance}</h1></div>
                            </div>
                            <div className="row mb-5">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Reference</th>
                                            <th className="text-right">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {accountReceivableList.map(receiver => (
                                            <tr key={receiver.id}>
                                                <td>{`${moment(receiver.createdAte).format('DD-MM-YYYY')}`}</td>
                                                <td>{receiver.reference}</td>
                                                <td className="text-right">€{receiver.amount}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="payee" role="tabpanel" aria-labelledby="payee-tab">
                            <h5 className="text-right mt-5">
                                <Link to={`/payee/create/${customerId}`} className="btn btn-primary btn-lg">Add new payee</Link></h5>
                            <div className="row">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Account No</th>
                                            <th>Sortcode</th>
                                            <th className="text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {payees.map(payee => (
                                            <tr key={payee.id}>
                                                <td>{payee.payeeName}</td>
                                                <td>{payee.accountNumber}</td>
                                                <td>{payee.sortcode}</td>
                                                <td className="text-right"><Link to={`/payee/view/${payee.id}`} className="btn btn-info btn-sm mr-2">View</Link>
                                                    <Link to={`/payee/update/${payee.id}`} className="btn btn-warning btn-sm mr-2">Edit</Link>
                                                    <Link to={`/transaction/create/${payee.id}`} className="btn btn-success btn-sm mr-2">Make transfer</Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className="m-auto">
                                    <Pagination
                                        itemsCount={payees.length}
                                        pageSize={pageSize}
                                        currentPage={currentPage}
                                        onPageChange={handlePageChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade mt-5" id="transaction" role="tabpanel" aria-labelledby="transaction-tab">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Payee</th>
                                        <th>Amount</th>
                                        <th>Reference</th>
                                        <th>Status</th>
                                        <th className="text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactions.map(transaction => (
                                        <tr key={transaction.id}>
                                            <td>{`${moment(transaction.createdAte).format('DD-MM-YYYY')}`}</td>
                                            <th>{transaction.payee.payeeName}</th>
                                            <th>€{transaction.amount}</th>
                                            <th>{transaction.reference}</th>
                                            <th>{transaction.status}</th>
                                            <td className="text-right">
                                                <Link to={`/transaction/view/${transaction.id}`} className="btn btn-info btn-sm mr-2">View</Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="row"><div className="m-auto">
                                <Pagination
                                    itemsCount={transactionList.length}
                                    pageSize={pageSize}
                                    currentPage={currentPage}
                                    onPageChange={handlePageChange}
                                />
                            </div></div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )

    return (
        <Layout>
            <div className="container-profile">
                <h1 className="text-lead text-center">{`${values.firstName} ${values.lastName}`}</h1>
                <hr />
                {profileInfo()}
                <hr />
                {histry()}
            </div>
        </Layout>
    );
};

export default Profile;
