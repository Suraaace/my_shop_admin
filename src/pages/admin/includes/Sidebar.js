import React from 'react';
import {Link} from "react-router-dom";

export const Sidebar = (props) => {
    return (
        <nav className="nav flex-column" style={ {backgroundColor: "#e8e8e8"}} >
            <Link to="/admin/user" className="nav-link">User Management</Link>
            <Link to="/admin/product" className="nav-link">Product Management</Link>
            <Link to="/admin/order" className="nav-link">Order Management</Link>
            <Link to="/admin/category" className="nav-link">Category Management</Link>

        </nav>
    );
};