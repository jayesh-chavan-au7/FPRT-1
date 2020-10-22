import React from 'react'
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import { httpRequest } from '../../../httpRequest'

const AddProduct = function (props) {
    let {  isSubmitting, touched, errors } = props
    
    return(
        <div className="container">
            <h1 className="display-4 text-center">Add Product</h1>
            <Form>
                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label htmlFor="Product_Name">Name :</label>
                        <Field
                            type="text"
                            className="form-control"
                            id="Product_Name"
                            name="name"
                        />
                        <small className="form-text text-muted">
                            Enter Product name
                        </small>
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="Price">Price :</label>
                        <Field
                            type="text"
                            className="form-control"
                            id="Price"
                            name="price"
                        />
                        <small className="form-text text-muted">
                            Enter Price In Rupees
                        </small>
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="Quanity">Quanity :</label>
                        <Field
                            type="text"
                            className={
                                touched.quanity && errors.quantity
                                    ? "form-control is-invalid"
                                    : "form-control"
                            }
                            id="Quantity"
                            name="quantity"
                        />
                        <small
                            className={
                                touched.quantity && errors.quantity
                                    ? "form-text error-msg"
                                    : "hidden"
                            }
                        >
                            {touched.quantity && errors.quantity && errors.quantity}
                        </small>
                        <small className="form-text text-muted">
                            Enter Quantity
                        </small>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label htmlFor="Category">Category : </label>
                        <Field
                            type="text"
                            className="form-control"
                            id="Category"
                            name="category"
                        />
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="Brand">Brand : </label>
                        <Field
                            type="text"
                            className="form-control"
                            id="Brand"
                            name="brand"
                        />
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="Staus">Status : </label>
                        <div className="form-check">
                            <Field
                                type="checkbox"
                                className="form-check-input"
                                id="Status"
                                name="status"
                            />
                            <label
                                className="form-check-label"
                                htmlFor="Status"
                            >
                                update Status
                            </label>
                        </div>
                    </div>
                </div>
                <button
                    type="submit"
                    className="btn btn-success"
                    disabled={isSubmitting}
                >
                    Add Product
                </button>
            </Form>
        </div>
    )
}

const AddProductFormik = withFormik({
    mapPropsToValues : () => {
        return{
            name : "",
            price : "",
            quantity : "",
            brand : "",
            category : "",
            status: true
        }
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required(),
        price : Yup.string().required(),
        quantity : Yup.string().required(),
        brand : Yup.string().required(),
        category : Yup.string().required(),
        status: Yup.string().required()
    }),
    handleSubmit(values, formikBag) {
        const { props, setSubmitting } = formikBag;

        console.log(values);
        httpRequest.post('/vendor/create-product', values)
            .then(responce => {
                console.log(responce);
                props.navigate()
                setSubmitting(false);
            })

    }
})(AddProduct)

export default AddProductFormik