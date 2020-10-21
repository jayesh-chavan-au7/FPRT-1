import React from 'react'
import { useHistory } from 'react-router-dom'
import { httpRequest } from '../../../httpRequest'
import './logout.scss'

const LogoutBar = function (props) {

    const { navBrand } = props

    const history = useHistory()

    const clickHandler = () => {
        httpRequest.get("/user/logout").then((responce) => {
            if (responce.data === "done") {
                history.push("/");
            }
        });
    }

    return(
        <nav className="navbar navbar-light">
            <a className="navbar-brand" href="/">
                <span>{navBrand}</span>
            </a>
            <div className="navbar__btn">
                <button className="btn bg-primary" onClick={clickHandler}>Logout</button>
            </div>
        </nav>
    )
}

export default LogoutBar