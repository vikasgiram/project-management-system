const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    company:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
    },
   service:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Feedback', feedbackSchema);