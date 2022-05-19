const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: false,
        trim: true
    },
    lastName: {
        type: String,
        required: false,
        trim: true
    },
    email: {
        type: String,
        required: false,
        trim: true
    },
    createdAt: {
        type: Date,
        required: false,
        default: Date.now()
    }
});

mongoose.model('users', UsersSchema);