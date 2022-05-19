const mongoose = require('mongoose');
const TransactionsSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: false,
        default: 0
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: false,
    },
    createdAt: {
        type: Date,
        required: false,
        default: Date.now()
    }
});

mongoose.model('transactions', TransactionsSchema);