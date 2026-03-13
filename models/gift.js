const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GiftSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    purchased: Boolean,
    //Child ref?
})

module.exports = mongoose.model('Gift', GiftSchema)