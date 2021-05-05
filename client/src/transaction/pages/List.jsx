import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import * as moment from 'moment'

import Pagination from "../../shared/pagination/Pagination";
import { getCookie } from "../../auth/AuthHelper";
import Layout from "../../layout/common/Layout";
import paginate from "../../auth/paginate";
import './Transaction.css'

const TransactionList = () => {
    const [transactions, setTransactions] = useState([]);
    const token = getCookie("token");
    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = 10

    useEffect(() => {
        loadTransaction()
    }, []);

    const loadTransaction = () => {
        axios({
            method: "GET",
            url: `${process.env.REACT_APP_API}/transaction/list`,
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                // console.log("FOUND TRANSACTION LIST", response.data);
                setTransactions(response.data)
                toast.success(response.data.message);
            })
            .catch((error) => {
                // console.log("TRANSACTION LOADING ERROR", error.response.data.error);
                toast.error(error.response.data.error);
            });
    }
    const handlePageChange = (page) => {
        setCurrentPage(page)
    };
    const transactionsList = paginate(transactions, currentPage, pageSize);
    const handleActivation = transaction => {
        const status = "Completed";
        const accountNumber = transaction.payee.accountNumber;
        console.log(transaction);
        axios({
            method: "PUT",
            url: `${process.env.REACT_APP_API}/transaction/release-transaction/${transaction.id}`,
            headers: { Authorization: `Bearer ${token}` },
            data: { status, accountNumber }
        })
            .then((response) => {
                // console.log("TRANSACTION HAS BEEN RELEASED", response);
                toast.success(response.data.message);
                loadTransaction();
            })
            .catch((error) => {
                // console.log("TRANSACTION RELEASE ERROR", error.response.data.error);
                toast.error(error.response.data.error);
            });
    };
    const displayTansactionList = () => (
        <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12 table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Account</th>
                            <th>Payee</th>
                            <th>Customer</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th className='text-center'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            transactionsList.map(transaction => (
                                <tr key={transaction.id}>
                                    <td>{`${moment(transaction.createdAte).format('DD-MM-YYYY')}`}</td>
                                    <td>{transaction.receiver}</td>
                                    <td>{transaction.payee.payeeName}</td>
                                    <td>{transaction.customer.firstName + " " + transaction.customer.lastName}</td>
                                    <td>€{transaction.amount}</td>
                                    <td>{transaction.status}</td>
                                    <td>
                                        {transaction.status === "Pending" ?
                                            <Link onClick={() => { if (window.confirm('Are you sure, you want to release the transaction?')) { handleActivation(transaction) }; }} to='#' className="btn btn-outline-danger btn-md btn-block">Release?</Link>
                                            :
                                            <Link to='#' className="btn btn-success btn-md btn-block">Completed</Link>
                                        }
                                    </td>

                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <div className="m-auto">
                <Pagination
                    itemsCount={transactions.length}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
    return (
        <Layout>
            <div className="container-transaction-list">
                <h1 className="text-center">List of transactions</h1>
                {displayTansactionList()}
            </div>
        </Layout>
    );
};

export default TransactionList;
