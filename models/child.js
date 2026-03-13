const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChildSchema = new Schema({
    name: String,
    birthday: Number,
    age: Number,
    gifts: [
        { type: Schema.Types.ObjectId, ref: 'Gift'}
    ]
});

module.exports = mongoose.model('Child', ChildSchema)