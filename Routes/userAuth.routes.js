import express from 'express'
import userAuthController from '../Controllers/userAuthController'
import isUserAuth from '../utils/isUserAuth'

const Router = express.Router()

// Routes Common To all

Router.post('/signup', userAuthController.signup)
Router.post('/login', userAuthController.login)
Router.get('/logout', userAuthController.logout)

// Profile Related
Router.get('/get-user', isUserAuth, userAuthController.getUser)
Router.post('/update-user', isUserAuth, userAuthController.updateUser)
Router.get('/delete-user', isUserAuth, userAuthController.deleteUser)


module.exports = Router