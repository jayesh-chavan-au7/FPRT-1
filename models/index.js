import { config } from 'dotenv'
config()
import mongoose from 'mongoose'

import userSchema from './userSchema'
import productSchema from './productSchema'
import categorySchema from './categorySchema'
import brandSchema from './brandSchema'

const conn =  mongoose.createConnection( process.env.MONGODB_ATLAS_URL, 
        {
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useNewUrlParser: true,
        },
        (err) => {
            if(!err){
                return console.log('DataBase Connected');
            }
        }
    )

conn.model('User', userSchema)
conn.model('Product', productSchema)
conn.model('Category', categorySchema)
conn.model('Brand', brandSchema)

export const UserModel = conn.models.User
export const ProductModel = conn.models.Product
export const CategoryModel = conn.models.Category
export const BrandModel = conn.models.Brand