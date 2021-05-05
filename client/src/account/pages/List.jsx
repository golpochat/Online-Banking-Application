import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import Pagination from "../../shared/pagination/Pagination";
import { getCookie } from "../../auth/AuthHelper";
import Layout from "../../layout/common/Layout";
import paginate from "../../shared/pagination/Pagination";
import './Account.css'

const UserList = () => {
    const [users, setUsers] = useState([]);
    const token = getCookie("token");
    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = 10

    useEffect(() => {
        userList()
    }, []);

    const userList = () => {
        axios({
            method: "GET",
            url: `${process.env.REACT_APP_API}/user/list`,
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                // console.log("FOUND USERS LIST", response.data);
                setUsers(response.data)
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
    const handleActivation = user => {
        const status = user.status ? 0 : 1
        axios({
            method: "PUT",
            url: `${process.env.REACT_APP_API}/admin/user/update/${user._id}`,
            headers: { Authorization: `Bearer ${token}` },
            data: { status: status }
        })
            .then((response) => {
                // console.log("USER HAS BEEN UPDATED", response);
                toast.success(response.data.message);
                userList()
            })
            .catch((error) => {
                console.log("USER UPDATE ERROR", error.response.data.error);
                toast.error(error.response.data.error);
            });
    };
    const usersList = paginate(users, currentPage, pageSize);

    const displayUserList = () => (
        <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12 table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Role</th>
                            <th className='text-center'>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            usersList.map(user => (
                                <tr key={user._id}>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    {user.role !== 'admin' && <td>{user.status === 1 ?
                                        <Link onClick={() => { if (window.confirm('Are you sure, you want to deactivate this user?')) { handleActivation(user) }; }} to='#' className="btn btn-danger btn-md btn-block">Deactivated</Link>
                                        :
                                        <Link onClick={() => { if (window.confirm('Are you sure, you want to activate this user?')) { handleActivation(user) }; }} to='#' className="btn btn-primary btn-md btn-block">Activated</Link>}
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
                    itemsCount={users.length}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
    return (
        <Layout>
            <div className="container-user-list">
                <h1 className="text-center">List of Users</h1>
                {displayUserList()}
            </div>
        </Layout>
    );
};

export default UserList;
