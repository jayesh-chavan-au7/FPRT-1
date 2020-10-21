import express from 'express'
import isUserAuth from '../utils/isUserAuth'
import vendorActionController from '../Controllers/vendorActionController'

const Router = express.Router()

const isVendor = (req,res,next) => {
    try {
        req.user.type === 'vendor' ? next() : res.status(200).send('Not an vendor')
    } catch (error) {
        res.status(500).send(error)
    }
}

Router.post('/create-product', isUserAuth, isVendor, vendorActionController.createProduct)
Router.get('/getall-products', isUserAuth, isVendor, vendorActionController.getAllProducts)
Router.post('/update-product', isUserAuth, isVendor, vendorActionController.updateProduct)
Router.get('/delete-product', isUserAuth, isVendor, vendorActionController.deleteProduct)

module.exports = Router