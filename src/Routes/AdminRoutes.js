import React, {useEffect, useState} from 'react';
import {Route, Redirect} from "react-router-dom";
import {Header} from "../pages/admin/includes/Header";
import {Footer} from "../pages/admin/includes/Footer";
import {Sidebar} from "../pages/admin/includes/Sidebar";
import {isBackendLogin} from "../helper/authorization";
import axios from "axios";


export const AdminRoutes = ({component: Component, ...rest}) => {

    const [isLogin, setIsLogin] = useState(true);
    useEffect(() => {
        let authToken = localStorage.getItem('auth_token');
        axios.get(process.env.REACT_APP_API_HOST_URL+'/auth/validate/jwt',  {
            params: {
                token: authToken,
            }
        })
            .then((res) => {
                setIsLogin(true)
            })
            .catch(err => {
                setIsLogin(false)
            });


    }, []);

    return isLogin ?
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