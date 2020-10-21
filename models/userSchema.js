import { config } from 'dotenv';
config()
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import mongoosePaginate from 'mongoose-paginate-v2'

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },
    bio : {
        type : String,
        trim : true
    },
    profile_photo : {
        fileName : {
            type: String,
            trim: true,
        },
        firebaseUrl : {
            type: String,
            trim: true,
        }
    },
    status: {
        type : Boolean
    },
    email : {
        type : String,
        required : true,
        unique : true,
        trim : true
    },
    password : {
        type : String,
        required : true,
        trim : true
    },
    type : {
        type : String,
        required : true
    },
    products : [{
        product : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Product'
        }
    }]
})

userSchema.methods.genrateAuthToken = function(){
    const user = this
    const token = jwt.sign( {_id : user._id.toString()}, process.env.SECRET_KEY, { expiresIn : '6h' })
    return token
}

userSchema.pre('save', async function(next) {
    const user = this
    if (user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

userSchema.plugin(mongoosePaginate)

module.exports = userSchema