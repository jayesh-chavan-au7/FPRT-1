import express from 'express'
import isUserAuth from '../utils/isUserAuth'
import userActionController from '../Controllers/userActionController'

const Router = express.Router()

Router.get('/getall-products', isUserAuth, userActionController.getAllProducts )

module.exports = Router