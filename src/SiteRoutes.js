import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'axios-progress-bar/dist/nprogress.css';

import {loadProgressBar} from 'axios-progress-bar';

import {
    Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import history from "./helper/history";
import {AdminRoutes} from "./Routes/AdminRoutes";
import UserIndex from "./pages/admin/modules/user/UserIndex";
import UserCreate from "./pages/admin/modules/user/UserCreate";
import ProductIndex from "./pages/admin/modules/product/ProductIndex";
import ProductCreate from "./pages/admin/modules/product/ProductCreate";
import CategoryIndex from "./pages/admin/modules/category/CategoryIndex";
import CategoryCreate from "./pages/admin/modules/category/CategoryCreate";
import OrderIndex from "./pages/admin/modules/order/OrderIndex";
import OrderCreate from "./pages/admin/modules/order/OrderCreate";
import {AdminLoginRoutes} from "./Routes/AdminLoginRoutes";
import {AdminLogin} from "./pages/admin/modules/login/AdminLogin";
import {ForgotPassword} from "./pages/admin/modules/login/ForgotPassword";

import {GlobalStoreProvider, GlobalStore} from 'global-store-hook';

export const SiteRoutes = (props) => {
    
    loadProgressBar();

    let cart = localStorage.getItem('cart');
    if(!cart) {
        cart = [];
    } else {
        cart = JSON.parse(cart);
    }

    const init = {
        cart: cart,
        user: {
            _id: "5e78c54d79771f735e168589",
            name: "Kiran Mulmi",
            //email: "a"
        }
    };

    return (
        <GlobalStoreProvider initValues={init}>
            <Router history={history}>
            <Switch>
                {/* admin routes*/}

                <AdminLoginRoutes exact path={'/admin/login'} component={AdminLogin}/>
                <AdminLoginRoutes exact path={'/admin/'} component={AdminLogin}/>
                <AdminLoginRoutes exact path={'/admin/forgot-password'} component={ForgotPassword}/>

                <AdminRoutes exact path={'/'} component={ProductIndex}/>

                {/*User Management*/}
                <AdminRoutes exact path={'/admin/user'} component={UserIndex}/>
                <AdminRoutes exact path={'/admin/user/create'} component={UserCreate}/>
                <AdminRoutes exact path={'/admin/user/edit/:id'} component={UserCreate}/>

                {/* Product Management*/}
                <AdminRoutes exact path={'/admin/product'} component={ProductIndex}/>
                <AdminRoutes exact path={'/admin/product/create'} component={ProductCreate}/>
                <AdminRoutes exact path={'/admin/product/edit/:id'} component={ProductCreate}/>

                {/* Category Management*/}
                <AdminRoutes exact path={'/admin/category'} component={CategoryIndex}/>
                <AdminRoutes exact path={'/admin/category/create'} component={CategoryCreate}/>
                <AdminRoutes exact path={'/admin/category/edit/:id'} component={CategoryCreate}/>

                {/* Order Management */}
                <AdminRoutes exact path={'/admin/order'} component={OrderIndex}/>
                <AdminRoutes exact path={'/admin/order/create'} component={OrderCreate}/>

            </Switch>
        </Router>
        </GlobalStoreProvider>
    );
};