import React, { Component } from "react";
import { connect } from "react-redux";
import { getUser } from "../../Redux/User/UserAction";
import { httpRequest } from "../../httpRequest";
import LogoutBar from "../../Components/shared/LogoutBar";
import Profile from "../../Components/shared/Profile";
import Products from "../../Components/NormalUser/Products"
import Delete from "../../Components/shared/Delete";
class UserDahboard extends Component {
    state = {
        profile: 1,
        products: 0,
        delete: 0,
    };

    componentDidMount() {
        this.props.getUser();
    }

    navigateToProfile = () => {
        this.setState({
            profile: 1,
            products: 0,
            delete: 0,
        });
    };
    deleteHandler = () => {
        httpRequest.get("/user/delete-user").then((responce) => {
            if (responce.data === "done") {
                this.props.history.push("/");
            }
        });
    };
    render() {
        return (
            <div className="container">
                <LogoutBar navBrand="User" />
                <ul className="nav justify-content-center">
                    <li className="nav-item">
                        <button
                            className="btn btn-primary"
                            onClick={() =>
                                this.setState({
                                    profile: 1,
                                    products: 0,
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
                                    profile: 0,
                                    products: 1,
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
                                    profile: 0,
                                    products: 0,
                                    delete: 1,
                                })
                            }
                        >
                            Delete
                        </button>
                    </li>
                </ul>
                {this.state.profile ? (
                    <Profile
                        userData={this.props.userData}
                        navigate={this.navigateToProfile}
                    />
                ) : this.state.products ? (<Products/> ) : (
                    <Delete deleteHandler={this.deleteHandler} />
                )}
            </div>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(UserDahboard);
