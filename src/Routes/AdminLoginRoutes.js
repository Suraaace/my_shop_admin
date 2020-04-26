import React from 'react';
import {Route} from "react-router-dom";


export const AdminLoginRoutes = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => (<Component {...props} />)}/>
);