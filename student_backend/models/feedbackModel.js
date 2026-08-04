const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        match: [/.+@.+\..+/, 'Please provide a valid email'],
    },
    course: {
        type: String,
        required: true,
        trim: true,
    },
    feedback: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Feedback', feedbackSchema);
