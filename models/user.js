const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
email: { type: String, required: true, unique: true },
password: { type: String, required: true },
firstName: { type: String },
lastName: { type: String },
createdDate: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

module.exports = User;