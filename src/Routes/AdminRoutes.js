import React from 'react';
import {Route, Redirect} from "react-router-dom";
import {Header} from "../pages/admin/includes/Header";
import {Footer} from "../pages/admin/includes/Footer";
import {Sidebar} from "../pages/admin/includes/Sidebar";


export const AdminRoutes = ({component: Component, ...rest}) => {
    return localStorage.getItem('auth_token') ?
    (
        <div>
            <Header/>
            <div className={'row'}>
                <div className={'col-2'}>
                    <Sidebar/>
                </div>
                <div className={'col-10'}>
                    <Route {...rest} render={props => (<Component {...props} />)}/>
                </div>
            </div>
            <Footer/>
        </div>
    ) :  <Redirect to="/admin/login" />
};