import React from "react";
import { withFormik, Form, Field } from "formik";
import { connect } from "react-redux";
import { fetchUserSuccess } from "../../../Redux/User/UserAction";
import { httpRequest } from "../../../httpRequest";
import FileUpload from "../FileUpload"
import "./profile.scss";

const Profile = function (props) {
    let profile = props.userData.profile;

    return (
        <div className="container d-flex justify-content-center align-items-center profile">
            <div>
                <div className="card">
                    <div className="row no-gutters">
                        <div className="col-sm-6 ">
                            <img
                                src={
                                    profile.profile_photo
                                        ? `${profile.profile_photo.firebaseUrl}`
                                        : require("../../../utils/images/Men_icon.jpg")
                                }
                                className="card-img"
                                alt="..."
                            />
                        </div>
                        <div className="col-sm-6">
                            <div className="card-body">
                                <h1 className="display-4">
                                    {profile.name || `N/A`}
                                </h1>
                                <h5 className="card-title">
                                    {profile.bio ? profile.bio : "Bio"}
                                </h5>
                                <p className="card-text">
                                    Type :{" "}
                                    <small className="text-muted">
                                        {profile.type || `N/A`}
                                    </small>
                                </p>
                                <p className="card-text">
                                    Email :{" "}
                                    <small className="text-muted">
                                        {profile.email || `N/A`}
                                    </small>
                                </p>
                                <p className="card-text">
                                    <small
                                        className={
                                            profile.status
                                                ? "text-success"
                                                : "text-danger"
                                        }
                                    >
                                        {profile.status ? `Active` : `Offline`}
                                    </small>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="status-form d-flex justify-content-center align-items-center">
                    <Form>
                        <div className="custom-control custom-switch d-flex justify-content-center">
                            <div className="checkbox">
                                <Field
                                    type="checkbox"
                                    className="custom-control-input"
                                    name="status"
                                    id="status-switch"
                                />
                                <label
                                    className="custom-control-label"
                                    htmlFor="status-switch"
                                >
                                    Status
                                </label>
                            </div>
                        </div>
                        <button className="btn btn-info">update</button>
                    </Form>
                </div>
                <div className="d-flex justify-content-center align-items-center update-photo">
                    <div>
                        <h1 className="display-4">Upload profile photo</h1>
                        <FileUpload fileName={profile._id} navigate={props.navigate}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ProfileFormik = withFormik({
    mapPropsToValues: ({ userData }) => {
        let profile = userData.profile;
        return {
            status: profile.status || false,
        };
    },
    handleSubmit(values, formikBag) {
        const { props, setSubmitting } = formikBag;

        httpRequest.post("/user/update-user", values).then((responce) => {
            console.log(responce);
            props.updateUser(responce.data);
            setSubmitting(false);
        });
    }
    })(Profile);

const mapDispatchToProps = (dispatch) => {
    return {
        updateUser: (updatedUser) => dispatch(fetchUserSuccess(updatedUser)),
    };
};

export default connect(null, mapDispatchToProps)(ProfileFormik);
