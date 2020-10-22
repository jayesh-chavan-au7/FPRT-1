import React, { Component } from "react";
import { connect } from "react-redux";
import {
    getAdminUsers,
    fetchAdminUsersSuccess,
} from "../../../Redux/User/UserAction";
import { httpRequest } from "../../../httpRequest";
import _ from "lodash";
import Loader from "../../shared/Loader";

class AdminUsers extends Component {
    componentDidMount() {
        this.props.getAdminUsers();
    }

    updateStatus(user) {
        let userstatus = user.status;
        httpRequest
            .post(`/admin/update-user?_id=${user._id}&type=user`, {
                status: !userstatus,
            })
            .then((response) => {
                if (response.data) {
                    this.props.updateAdminUsers(response.data);
                }
            });
    }

    deleteuser(user) {
        httpRequest
            .get(`/admin/delete-user?_id=${user._id}&type=user`)
            .then((response) => {
                if (response.data) {
                    this.props.updateAdminUsers(response.data);
                }
            });
    }

    render() {

        console.log(this.props.users);

        return this.props.users.loading ? (
            <Loader />
        ) : (
            <div>
                <div className="row row-col-1 row-cols-md-2">
                    {_.map(this.props.users.adminUsers, (user, idx) => (
                        <div className="card" key={idx}>
                            <div className="row no-gutters">
                                <div className="col-sm-6 ">
                                    <img
                                        src={
                                            user.profile_photo
                                                ? `${user.profile_photo.firebaseUrl}`
                                                : require("../../../utils/images/Men_icon.jpg")
                                        }
                                        className="card-img"
                                        alt="..."
                                    />
                                </div>
                                <div className="col-sm-6">
                                    <div className="card-body">
                                        <h1 className="display-4">
                                            {user.name || `N/A`}
                                        </h1>
                                        <h5 className="card-title">
                                            {user.bio ? user.bio : "Bio"}
                                        </h5>
                                        <p className="card-text">
                                            Type :{" "}
                                            <small className="text-muted">
                                                {user.type || `N/A`}
                                            </small>
                                        </p>
                                        <p className="card-text">
                                            Email :{" "}
                                            <small className="text-muted">
                                                {user.email || `N/A`}
                                            </small>
                                        </p>
                                        <p className="card-text">
                                            <small
                                                className={
                                                    user.status
                                                        ? "text-success"
                                                        : "text-danger"
                                                }
                                            >
                                                {user.status
                                                    ? `Active`
                                                    : `Offline`}
                                            </small>
                                        </p>
                                        <div className="d-flex w-100 justify-content-around mt-1">
                                            <button
                                                className="btn btn-info"
                                                onClick={() =>
                                                    this.updateStatus(user)
                                                }
                                            >
                                                Change status
                                            </button>
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => {
                                                    this.deleteuser(user);
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAdminUsers: () => dispatch(getAdminUsers()),
        updateAdminUsers: (updatedAdminUsers) =>
            dispatch(fetchAdminUsersSuccess(updatedAdminUsers)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminUsers);
