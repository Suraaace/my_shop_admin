import React from 'react';
import {Link} from "react-router-dom";

export const Header = (props) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark navbar-wrapper">
            <Link to={'/admin/user'}>Backend Header</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <a className="nav-link" href={process.env.REACT_APP_FRONTEND_HOST_URL} target={'_blank'}>Visit Site</a>
                    </li>
                </ul>
                
            </div>
        </nav>
    );
};