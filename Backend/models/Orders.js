const mongoose = require('mongoose')
const {Schema} = mongoose
const OrderSchema = new Schema({
    email:{
        type:String,
        required: true,
        unique: true
    },
    order_data: {
        type: Array,
        required: true
    }
})
// mongoose is already connected with the data base here we apply the UserSchema on /orders subdirectory of the atlas , this object is essentially carrying the data with it ( not actually we use helper functions to acess the data remotely ) , hence when we interact with the database we need to use the await functionality inside the async function
module.exports = mongoose.model('order', OrderSchema)