import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";


import Pagination from "../../shared/pagination/Pagination";
import { getCookie } from "../../auth/AuthHelper";
import Layout from "../../layout/common/Layout";
import paginate from "../../auth/paginate";
import './Payee.css'

const UserList = () => {
    const [payees, setPayees] = useState([]);
    const token = getCookie("token");
    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = 10

    useEffect(() => {
        loadPayeeList()
    }, []);

    const loadPayeeList = () => {
        axios({
            method: "GET",
            url: `${process.env.REACT_APP_API}/payee/list`,
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                // console.log("FOUND USERS LIST", response.data);
                setPayees(response.data)
                toast.success(response.data.message);
            })
            .catch((error) => {
                // console.log("USERS LOADING ERROR", error.response.data.error);
                toast.error(error.response.data.error);
            });
    }
    const handlePageChange = (page) => {
        setCurrentPage(page)
    };
    const payeesList = paginate(payees, currentPage, pageSize);

    const displayUserList = () => (
        <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12 table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            payeesList.map(payee => (
                                <tr key={payee.id}>
                                    <td>{payee.email}</td>
                                    <td>{payee.role}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <div className="m-auto">
                <Pagination
                    itemsCount={payees.length}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
    return (
        <Layout>
            <div className="container-payee-list">
                <h1 className="text-center">List of payees</h1>
                {displayUserList()}
            </div>
        </Layout>
    );
};

export default UserList;
