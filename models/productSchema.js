import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const productSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    price : {
        type : String,
        required : true
    },
    quantity :{
        type : String,
        required : true
    },
    vendor : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    brand : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Brand'
    },
    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Category'
    },
    status : {
        type : Boolean
    }
})

productSchema.plugin(mongoosePaginate)

module.exports = productSchema