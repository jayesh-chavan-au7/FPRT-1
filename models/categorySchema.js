import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const categorySchema = mongoose.Schema({
    name : {
        type : String,
        unique : true,
        required : true
    },
    category_photo : {
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

categorySchema.plugin(mongoosePaginate)

module.exports = categorySchema