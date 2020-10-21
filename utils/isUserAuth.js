import { config } from 'dotenv'
config()
import jwt from 'jsonwebtoken'
import { UserModel } from '../models'

const isUserAuth = async (req,res,next) => {
    try {
        let token = req.cookies.auth
        if(!token){
            return res.status(200).send('please Authenticate')
        }
        const decode = jwt.verify(token, process.env.SECRET_KEY)
        const user = await UserModel.findById({ _id : decode._id })
        if(!user){
            return res.status(200).send('please Authenticate')
        }
        req.token = token
        user.password = undefined
        req.user = user
        next()
    } catch (error) {
        console.log('cookie expire',error);
        return res.status(401).redirect('/')
    }
}

module.exports = isUserAuth