import bcrypt from 'bcryptjs'
import { UserModel } from '../models'

const findByCredentials =  async function (email,password) {
    const user = await UserModel.findOne({ email })
    if(!user){
        console.log('Wrong Email');
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        console.log('Wrong Password');
        throw new Error('Unable to login')
    }
    return user
}

class UserAuthController{

    async signup(req,res,next){
        try {
            const user = new UserModel(req.body)
            await user.save()
            res.status(201).send('done')
        } catch (error) {
            if (error.name === "MongoError" && error.code === 11000) {
                res.clearCookie("auth");
                return res.status(200).send("User already exit");
            }
            res.status(500).send(error);
        }
    }

    async login(req,res,next){
        try {
            const user = await findByCredentials( req.body.email, req.body.password )
            const token = await user.genrateAuthToken()
            res.cookie("auth", token, { maxage : 21600000 })
            res.status(200).send(user)
        } catch (error) {
            res.status(200).send("Invalid Credentials !!")
        }
    }

    async logout(req,res,next){
        try {
            res.clearCookie("auth")
            res.status(200).send("done")
        } catch (error) {
            res.status(500).send(error)
        }
    }

    getUser(req,res,next){
        try {
            res.status(200).send(req.user)        
        } catch (error) {
            res.status(500).send(error)
        }
    }

    async updateUser(req,res,next){
        try {
            const user = await UserModel.findByIdAndUpdate(
                req.user._id,
                req.body,
                { new : true }
            );
            res.status(200).send(user)
        } catch (error) {
            res.status(500).send(error)
        }
    }
}

module.exports = new UserAuthController()