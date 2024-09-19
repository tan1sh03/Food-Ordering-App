const mongoose = require('mongoose');
const {Schema} = mongoose;

// create schema for menu item

const menuSchema =new Schema({
    //_id: String,
    name: {
        type: String,
        trim: true,
        required: true,
        minlength: 3
    },
    recipe: String,
    image: String,
    category: String,
    price: Number,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

// create model
const Menu = mongoose.model("Menu",menuSchema);
module.exports = Menu;