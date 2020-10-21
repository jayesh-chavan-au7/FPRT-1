import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const brandSchema = mongoose.Schema({
    name : {
        type : String,
        unique : true,
        required : true
    },
    brand_photo : {
        fileName : {
            type: String,
            trim: true,
        },
        firebaseUrl : {
            type: String,
            trim: true,
        }
    },
    status : {
        type : Boolean
    }
})

brandSchema.plugin(mongoosePaginate)

module.exports = brandSchema