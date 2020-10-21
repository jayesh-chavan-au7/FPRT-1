import React from "react";
import { WEB_URL } from '../../Config'
import { Link } from 'react-router-dom'
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import { httpRequest } from "../../httpRequest";

const Login = function (props) {
    const { touched, errors, isSubmitting } = props;

    return (
        <div className="container login p-2 mt-5">
            <h1 className="dispaly-3 text-center">Login</h1>
            <div className="d-flex w-100 align-items-center justify-content-center mt-2">
                <div className="login_form">
                    <Form>
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
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
                                id="email"
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
                            <label htmlFor="password">Password</label>
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
                                id="password"
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
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={isSubmitting}
                        >
                            Login
                        </button>
                    </Form>
                </div>
            </div>
            <p className="lead text-center mt-3">Don't have and an account ? <Link to={WEB_URL.User_Signup}>Click here</Link></p>
        </div>
    );
};

const LoginFormik = withFormik({
    mapPropsToValues: () => {
        return {
            email: "",
            password: "",
        };
    },
    validationSchema: Yup.object().shape({
        email: Yup.string().email().required(),
        password: Yup.string().min(7).required(),
    }),
    handleSubmit(values, formikBag) {

        const { props, resetForm, setErrors, setSubmitting} = formikBag

        httpRequest
            .post("/user/login", values)
            .then((responce) => {
                if(responce.data === 'Invalid Credentials !!'){
                    setErrors({ email : 'Wrong Credintials' })
                    setSubmitting(false)
                    return
                }
                resetForm()
                setSubmitting(false)
                props.history.push(WEB_URL.User_Dashboard)
            })
            .catch((error) => {
                console.log(error);
            });
    }
})(Login)

export default LoginFormik