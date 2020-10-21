import express from 'express'
import isUserAuth from '../utils/isUserAuth'
import adminActionController from '../Controllers/adminActionController'

const Router = express.Router()

const isAdmin = (req,res,next) => {
    try {
        req.user.type === 'admin' ? next() : res.status(200).send('Not an admin')
    } catch (error) {
        res.status(500).send(error)
    }
}

Router.post('/create-user', isUserAuth, isAdmin, adminActionController.createUser )
Router.get('/getall-users', isUserAuth, isAdmin, adminActionController.getAll )
Router.post('/update-user', isUserAuth, isAdmin, adminActionController.updateUser )
Router.get('/delete-user', isUserAuth, isAdmin, adminActionController.deleteUser )


Router.post('/create-vendor', isUserAuth, isAdmin, adminActionController.createUser )
Router.get('/getall-vendors', isUserAuth, isAdmin, adminActionController.getAll )
Router.post('/update-vendor', isUserAuth, isAdmin, adminActionController.updateUser )
Router.get('/delete-vendor', isUserAuth, isAdmin, adminActionController.deleteUser )

Router.post('/create-product', isUserAuth, isAdmin, adminActionController.createProduct )
Router.get('/getall-products', isUserAuth, isAdmin, adminActionController.getAllProduct )
Router.post('/update-product', isUserAuth, isAdmin, adminActionController.updateProduct )
Router.get('/delete-product', isUserAuth, isAdmin, adminActionController.deleteProduct )

Router.post('/create-category', isUserAuth, isAdmin, adminActionController.createCategory )
Router.get('/getall-categories', isUserAuth, isAdmin, adminActionController.getAllCategory )
Router.post('/update-category', isUserAuth, isAdmin, adminActionController.updateCategory )
Router.get('/delete-category', isUserAuth, isAdmin, adminActionController.deleteCategory )

Router.post('/create-brand', isUserAuth, isAdmin, adminActionController.createbrand )
Router.get('/getall-brands', isUserAuth, isAdmin, adminActionController.getAllBrand )
Router.post('/update-brand', isUserAuth, isAdmin, adminActionController.updateBrand )
Router.get('/delete-brand', isUserAuth, isAdmin, adminActionController.deleteBrand )


module.exports = Router