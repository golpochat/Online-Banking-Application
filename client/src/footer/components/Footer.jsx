import React from 'react'
import './Footer.css'

export default () => {
    return (
        <footer className="bg-success text-white p-3 text-center">
            Copyright &copy; 2021-{new Date().getFullYear()}, Sujan Hossain - X19170602 & Kgosi Tumi Ramotadima - X20186282
        </footer>
    )
}
