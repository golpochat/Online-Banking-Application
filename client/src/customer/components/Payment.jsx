import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import * as moment from 'moment'
import axios from "axios";
import { toast } from "react-toastify";

import { isAuth, getCookie } from '../../auth/AuthHelper'

function PaymentTable(props) {
    const playerPayments = props.playerPayments
    // console.log(playerPayments)
    const token = getCookie("token");
    const handleDelete = payment => {
        axios({
            method: "DELETE",
            url: `${process.env.REACT_APP_API}/player-payment/delete/${payment._id}`,
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                // console.log("PAYMENT HAS BEEN DELETED", response);
                toast.success(response.data.message);
                return <Redirect to={`/admin/player/profile-admin-view/${playerPayments.profile}`} />
            })
            .catch((error) => {
                // console.log("PAYMENT DELETING ERROR", error.response.data.error);
                toast.error(error.response.data.error);
            });
    };
    return (
        <div className="table-responsive">
            <table className="table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Reference</th>
                        <th>Payment type</th>
                        {
                            isAuth().role === 'admin' &&
                            <th className='text-right'>Action</th>
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        playerPayments.map(payment => (
                            <tr key={payment._id}>
                                <td>{moment(payment.date).format('DD-MM-YYYY')}</td>
                                <td>{`€${payment.amount}`}</td>
                                <td>{payment.reference}</td>
                                <td>{payment.type}</td>
                                {
                                    isAuth().role === 'admin' &&
                                    <td className='text-right'>
                                        <Link to={`/${isAuth().role}/player-payment/read/${payment._id}`} className='btn btn-success btn-md mr-2'>View</Link>
                                        <Link to={`/${isAuth().role}/player-payment/update/${payment._id}`} className='btn btn-warning btn-md mr-2'>Edit</Link>
                                        <Link to='#' onClick={() => { if (window.confirm('Are you sure, you want to delete this record?')) { handleDelete(payment) }; }} className="btn btn-danger btn-md">Delete</Link>
                                    </td>
                                }
                            </tr>
                        )
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default PaymentTable
