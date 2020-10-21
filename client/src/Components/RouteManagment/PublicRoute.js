import React from "react";
import Cookies from 'js-cookie'
import { Route, Redirect } from "react-router-dom";
import { WEB_URL } from "../../Config";

export default function PublicRoute(props) {
    const { component: Component, ...rest  } = props;
    const isAuth = !!Cookies.get('auth')
    const user = Cookies.get('logedInAs')

    return (
        <Route
            {...rest}
            render={(routeProps) => {
                return isAuth ? (
                    user === "admin" ? <Redirect to={WEB_URL.Admin_Dashboard}/> :
                    user === "vendor" ? <Redirect to={WEB_URL.Vendor_Dashboard} /> :
                    <Redirect to={WEB_URL.User_Dashboard}/>
                ) : (
                    <Component {...rest} {...routeProps}/>
                );
            }}
        />
    );
}
