const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    id: String,
    user_first_name: String,
    user_last_name: String,
    user_email: String,
    user_password: String,
    user_age: String,
    created: Date
});

const Users = mongoose.model('Users', UserSchema);

module.exports = Users;