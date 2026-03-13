const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    password: String,
    children: [
        { type: Schema.Types.ObjectId, ref: 'Child' }
    ]
})

module.exports = mongoose.model('User', UserSchema)