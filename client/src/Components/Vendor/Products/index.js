import React, { Component } from "react";
import { connect } from "react-redux";
import {
    getVendorProducts,
    fetchVendorProductSuccess,
} from "../../../Redux/User/UserAction";
import { httpRequest } from "../../../httpRequest";
import _ from "lodash";
import Loader from "../../shared/Loader";

class VendorProducts extends Component {

    componentDidMount() {
        this.props.getVendorProducts();
    }

    updateStatus(product) {
        let productStatus = product.status
        httpRequest
            .post(`/vendor/update-product?_id=${product._id}`, { status : !productStatus })
            .then((response) => {
                if (response.data) {
                    this.props.updateVendorProducts(response.data);
                }
            });
    }

    deleteProduct(product) {
        httpRequest
            .get(`/vendor/delete-product?_id=${product._id}`)
            .then((response) => {
                if (response.data) {
                    this.props.updateVendorProducts(response.data);
                }
            });
    }

    render() {
        return this.props.products.loading ? (
            <Loader />
        ) : (
            <div>
                <div className="row row-col-1 row-cols-md-2">
                    {_.map(
                        this.props.products.vendorsProducts,
                        (product, idx) => (
                            <div className="card" key={idx}>
                                <div className="row no-gutters">
                                    <div className="col-sm-6 ">
                                        <img
                                            src={
                                                product.product_photo
                                                    ? `${product.product_photo.firebaseUrl}`
                                                    : require("../../../utils/images/Men_icon.jpg")
                                            }
                                            className="card-img"
                                            alt="..."
                                        />
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="card-body">
                                            <h1 className="h3">
                                                {product.name || `N/A`}
                                            </h1>
                                            <h5 className="card-title">
                                                {product.price
                                                    ? `Rs. ${product.price}`
                                                    : "Price"}
                                            </h5>
                                            <p className="card-text">
                                                Quantity :{" "}
                                                <small className="text-muted">
                                                    {product.quantity || `N/A`}
                                                </small>
                                            </p>
                                            <p className="card-text">
                                                Vendor :{" "}
                                                <small className="text-muted">
                                                    {product.vendor.name ||
                                                        `N/A`}
                                                </small>
                                            </p>
                                            <p className="card-text">
                                                Brand :{" "}
                                                <small className="text-muted">
                                                    {product.brand.name ||
                                                        `N/A`}
                                                </small>
                                            </p>
                                            <p className="card-text">
                                                Category :{" "}
                                                <small className="text-muted">
                                                    {product.category.name ||
                                                        `N/A`}
                                                </small>
                                            </p>
                                            <p className="card-text">
                                                <small
                                                    className={
                                                        product.status
                                                            ? "text-success"
                                                            : "text-danger"
                                                    }
                                                >
                                                    {product.status
                                                        ? `Active`
                                                        : `Offline`}
                                                </small>
                                            </p>
                                            <div className="d-flex w-100 justify-content-around mt-1">
                                                <button
                                                    className="btn btn-info"
                                                    onClick={() =>
                                                        this.updateStatus(product)
                                                    }
                                                >
                                                    Change status
                                                </button>
                                                <button 
                                                    className="btn btn-danger"
                                                    onClick={() => {
                                                        this.deleteProduct(product)
                                                    }}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getVendorProducts: () => dispatch(getVendorProducts()),
        updateVendorProducts: (updatedVendorProducts) =>
            dispatch(fetchVendorProductSuccess(updatedVendorProducts)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VendorProducts);
