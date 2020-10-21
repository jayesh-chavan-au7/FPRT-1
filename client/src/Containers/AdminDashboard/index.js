import React, { Component } from "react";
import LogoutBar from "../../Components/shared/LogoutBar";
import Profile from "../../Components/shared/Profile"
import { connect } from "react-redux";
import { getUser } from "../../Redux/User/UserAction";
import './dashboard.scss'
class AdminDashboard extends Component {
    state = {
        profile: 1,
        products: 0,
        vendors: 0,
        users: 0,
        delete: 0,
    };

    componentDidMount(){
        this.props.getUser()
    }

    navigateToProfile = () => {
        this.setState({
            profile: 1,
            products: 0,
            vendors: 0,
            users: 0,
            delete: 0
        })
    }
    render() {
        return (
            <div className="container">
                <LogoutBar navBrand="Admin" />
                <ul className="nav justify-content-center">
                    <li className="nav-item">
                        <button
                            className="btn btn-primary"
                            onClick={() =>
                                this.setState({
                                    Profile: 1,
                                    products: 0,
                                    vendors: 0,
                                    users: 0,
                                    delete: 0,
                                })
                            }
                        >
                            Profile
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className="btn btn-primary"
                            onClick={() =>
                                this.setState({
                                    Profile: 0,
                                    products: 1,
                                    vendors: 0,
                                    users: 0,
                                    delete: 0,
                                })
                            }
                        >
                            Products
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className="btn btn-primary"
                            onClick={() =>
                                this.setState({
                                    Profile: 0,
                                    products: 1,
                                    vendors: 0,
                                    users: 0,
                                    delete: 0,
                                })
                            }
                        >
                            Vendors
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className="btn btn-primary"
                            onClick={() =>
                                this.setState({
                                    Profile: 0,
                                    products: 1,
                                    vendors: 0,
                                    users: 1,
                                    delete: 0,
                                })
                            }
                        >
                            Users
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className="btn btn-primary"
                            onClick={() =>
                                this.setState({
                                    Profile: 0,
                                    products: 1,
                                    vendors: 0,
                                    users: 0,
                                    delete: 1,
                                })
                            }
                        >
                            Delete
                        </button>
                    </li>
                </ul>

                <Profile userData={this.props.userData} navigate={this.navigateToProfile}/>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userData: state.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUser: () => dispatch(getUser()),
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(AdminDashboard);
