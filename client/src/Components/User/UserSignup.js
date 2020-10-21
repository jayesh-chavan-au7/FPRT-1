import React from "react";
import { WEB_URL } from '../../Config'
import { Link } from 'react-router-dom'
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import { httpRequest } from "../../httpRequest";

const UserSignup = function (props) {

    let { touched, errors, isSubmitting } = props

    return (
        <div className="container signup p-2 mt-4">
            <h1 className="dispaly-3 text-center">Singup</h1>
            <div className="d-flex w-100 align-items-center justify-content-center mt-2">
                <div className="signup_form">
                    <Form>
                        <div className="form-group">
                            <label htmlFor="Name">Name : </label>
                            <small
                                className={
                                    touched.name && errors.name
                                        ? "form-text error-msg"
                                        : "hidden"
                                }
                            >
                                {touched.name && errors.name && errors.name}
                            </small>
                            <Field
                                type="text"
                                className={
                                    touched.name && errors.name
                                        ? "form-control is-invalid"
                                        : "form-control"
                                }
                                id="Name"
                                name="name"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="emailInput">Email Address</label>
                            <small
                                className={
                                    touched.email && errors.email
                                        ? "form-text error-msg"
                                        : "hidden"
                                }
                            >
                                {touched.email && errors.email && errors.email}
                            </small>
                            <Field
                                type="email"
                                className={
                                    touched.email && errors.email
                                        ? "form-control is-invalid"
                                        : "form-control"
                                }
                                id="emailInput"
                                name="email"
                                aria-describedby="email-help"
                            />
                            <small
                                id="emailHelp"
                                className="form-text text-muted"
                            >
                                We'll never share your email with anyone else.
                            </small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="passwordInput">Password</label>
                            <small
                                className={
                                    touched.password && errors.password
                                        ? "form-text error-msg"
                                        : "hidden"
                                }
                            >
                                {touched.password &&
                                    errors.password &&
                                    errors.password}
                            </small>
                            <Field
                                type="password"
                                className={
                                    touched.password && errors.password
                                        ? "form-control is-invalid"
                                        : "form-control"
                                }
                                id="passwordInput"
                                name="password"
                            />
                            <small
                                id="passwordInstruction"
                                className="form-text text-muted"
                            >
                                Password should containe atleast one number, one
                                chracter and one special symbol
                            </small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="Type">Type :</label>
                            <small
                                className={
                                    touched.type && errors.type
                                        ? "form-text error-msg"
                                        : "hidden"
                                }
                            >
                                {touched.type && errors.type && errors.type}
                            </small>
                            <Field
                                as="select"
                                id="Type"
                                name="type"
                                className={
                                    touched.type && errors.type
                                        ? "form-control is-invalid"
                                        : "form-control"
                                }
                            >
                                <option value="admin">Admin</option>
                                <option value="vendor">Vendor</option>
                                <option value="user">User</option>
                            </Field>
                            <small className="form-text text-muted">
                                Enter your Type
                            </small>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-success"
                            disabled={isSubmitting}
                        >
                            Signup
                        </button>
                    </Form>
                </div>
            </div>
            <p className="lead text-center mt-3">Already have and an account ? <Link to={WEB_URL.User_Login}>Click here</Link></p>
        </div>
    );
};


const UserSignupFormik = withFormik({
    mapPropsToValues : () =>{
        return {
            name : "",
            email : "",
            password : "",
            type : ""
        }
    },
    validationSchema : Yup.object().shape({
        name : Yup.string().required(),
        email: Yup.string().email().required(),
        password: Yup.string().min(7).required(),
        type: Yup.string().required()
    }),
    handleSubmit(values, formikBag) {

        const { props, resetForm, setErrors, setSubmitting } = formikBag

        httpRequest.post('/user/signup', values)
            .then(responce => {
                if(responce.data === 'User already exit'){
                    setErrors({ email : 'User already exit' })
                    setSubmitting(false)
                    return
                }
                resetForm()
                setSubmitting(false)
                props.history.push(WEB_URL.User_Login)
            })
            .catch(error => {
                console.log(error);
            })
    }
    
})(UserSignup)

export default UserSignupFormik