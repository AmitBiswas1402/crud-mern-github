const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    sex: {
        type: String,
        required: true,
        enum: ['Male', 'Female', 'Other'],
    },
});

module.exports = mongoose.model('User', userSchema);
