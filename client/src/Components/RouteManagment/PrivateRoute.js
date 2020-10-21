import React from "react";
import Cookies from 'js-cookie'
import { Route, Redirect } from "react-router-dom";
import { WEB_URL } from "../../Config";

import AdminDashboard from '../../Containers/AdminDashboard'
import VendorDashboad from '../../Containers/VendorDashboard'
import UserDashboard from '../../Containers/UserDashboard'

export default function PrivateRoute(props) {

    const { component: Component,...rest } = props;
    const isAuth = !!Cookies.get('auth')
    const user = Cookies.get('logedInAs')

    return (
        <Route
            {...rest}
            render={(routeProps) => {
                return isAuth ? (
                    user === "admin" ? <AdminDashboard {...rest} {...routeProps}/> :
                        user === "vendor" ? <VendorDashboad {...rest} {...routeProps}/> :
                            <UserDashboard {...rest} {...routeProps}/>
                ) : (
                    <Redirect to={WEB_URL.HOME}/>
                );
            }}
        />
    );
}
