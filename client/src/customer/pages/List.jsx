import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import Pagination from "../../shared/pagination/Pagination";
import { getCookie } from "../../auth/AuthHelper";
import Layout from "../../layout/common/Layout";
import paginate from "../../auth/paginate";
import './Customer.css'

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);
    const token = getCookie("token");
    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = 10

    useEffect(() => {
        CustomerList()
    }, []);

    const CustomerList = () => {
        axios({
            method: "GET",
            url: `${process.env.REACT_APP_API}/customer/list`,
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((customer) => {
                // console.log("FOUND CUSROMER LIST", customer.data);
                setCustomers(customer.data)
                toast.success(customer.data.message);
            })
            .catch((error) => {
                // console.log("CUSTOMER LOADING ERROR", error.response.data.error);
                toast.error(error.response.data.error);
            });
    }
    const handlePageChange = (page) => {
        setCurrentPage(page)
    };

    const customerList = paginate(customers, currentPage, pageSize);
    const handleActivation = customer => {
        const status = customer.status ? 0 : 1;
        // console.log(user);
        axios({
            method: "PUT",
            url: `${process.env.REACT_APP_API}/customer/customer-activate/${customer.id}`,
            headers: { Authorization: `Bearer ${token}` },
            data: { status: status }
        })
            .then((response) => {
                console.log("CUSTOMER HAS BEEN UPDATED", response);
                toast.success(response.data.message);
                CustomerList()
            })
            .catch((error) => {
                console.log("CUSTOMER UPDATE ERROR", error.response.data.error);
                toast.error(error.response.data.error);
            });
    };
    const displayCustomerList = () => (
        <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12 table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th className='text-center'>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            customerList.map(customer => (
                                <tr key={customer.id}>
                                    <td>{customer.firstName + " " + customer.lastName}</td>
                                    <td>{customer.email}</td>
                                    <td>{customer.mobile}</td>
                                    {customer.role !== 'admin' && <td>{customer.status === 1 ?
                                        <Link onClick={() => { if (window.confirm('Are you sure, you want to deactivate this customer?')) { handleActivation(customer) }; }} to='#' className="btn btn-outline-danger btn-md btn-block">Deactivate?</Link>
                                        :
                                        <Link onClick={() => { if (window.confirm('Are you sure, you want to activate this customer?')) { handleActivation(customer) }; }} to='#' className="btn btn-success btn-md btn-block">Activated</Link>}
                                    </td>
                                    }
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <div className="m-auto">
                <Pagination
                    itemsCount={customers.length}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
    return (
        <Layout>
            <div className="container-customer-list">
                <h1 className="text-center">List of customers</h1>
                {displayCustomerList()}
            </div>
        </Layout>
    );
};

export default CustomerList;
