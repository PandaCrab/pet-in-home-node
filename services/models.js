const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
    _id: String,
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    photo: String | null,
    email: String,
    phone: Number,
    animals: Array,
    volunteer: Boolean,
    age: Number
}, { collection: 'users' });

const Auth = mongoose.model('auth', authSchema);

const regSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    email: String,
    phone: Number,
    animals: Array,
    volunteer: Boolean,
    age: Number
});

const Registration = mongoose.model('registration', regSchema);

module.exports = {
    Auth, Registration
};
