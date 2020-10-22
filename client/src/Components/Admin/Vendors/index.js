import React, { Component } from "react";
import { connect } from "react-redux";
import {
    getAdminVendors,
    fetchAdminVendorsSuccess,
} from "../../../Redux/User/UserAction";
import { httpRequest } from "../../../httpRequest";
import _ from "lodash";
import Loader from "../../shared/Loader";

class AdminVendors extends Component {
    componentDidMount() {
        this.props.getAdminVendors();
    }

    updateStatus(vendor) {
        let vendorStatus = vendor.status;
        httpRequest
            .post(`/admin/update-vendor?_id=${vendor._id}&type=vendor`, {
                status: !vendorStatus,
            })
            .then((response) => {
                if (response.data) {
                    this.props.updateAdminVendors(response.data);
                }
            });
    }

    deletevendor(vendor) {
        httpRequest
            .get(`/admin/delete-vendor?_id=${vendor._id}&type=vendor`)
            .then((response) => {
                if (response.data) {
                    this.props.updateAdminVendors(response.data);
                }
            });
    }

    render() {

        console.log(this.props.vendors);

        return this.props.vendors.loading ? (
            <Loader />
        ) : (
            <div>
                <div className="row row-col-1 row-cols-md-2">
                    {_.map(this.props.vendors.adminVendors, (vendor, idx) => (
                        <div className="card" key={idx}>
                            <div className="row no-gutters">
                                <div className="col-sm-6 ">
                                    <img
                                        src={
                                            vendor.profile_photo
                                                ? `${vendor.profile_photo.firebaseUrl}`
                                                : require("../../../utils/images/Men_icon.jpg")
                                        }
                                        className="card-img"
                                        alt="..."
                                    />
                                </div>
                                <div className="col-sm-6">
                                    <div className="card-body">
                                        <h1 className="display-4">
                                            {vendor.name || `N/A`}
                                        </h1>
                                        <h5 className="card-title">
                                            {vendor.bio ? vendor.bio : "Bio"}
                                        </h5>
                                        <p className="card-text">
                                            Type :{" "}
                                            <small className="text-muted">
                                                {vendor.type || `N/A`}
                                            </small>
                                        </p>
                                        <p className="card-text">
                                            Email :{" "}
                                            <small className="text-muted">
                                                {vendor.email || `N/A`}
                                            </small>
                                        </p>
                                        <p className="card-text">
                                            <small
                                                className={
                                                    vendor.status
                                                        ? "text-success"
                                                        : "text-danger"
                                                }
                                            >
                                                {vendor.status
                                                    ? `Active`
                                                    : `Offline`}
                                            </small>
                                        </p>
                                        <div className="d-flex w-100 justify-content-around mt-1">
                                            <button
                                                className="btn btn-info"
                                                onClick={() =>
                                                    this.updateStatus(vendor)
                                                }
                                            >
                                                Change status
                                            </button>
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => {
                                                    this.deletevendor(vendor);
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
        vendors: state.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAdminVendors: () => dispatch(getAdminVendors()),
        updateAdminVendors: (updatedAdminVendors) =>
            dispatch(fetchAdminVendorsSuccess(updatedAdminVendors)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminVendors);
