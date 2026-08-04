const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    rollno: {
        type: Number,
        required: true,
        unique: true,
    },

    candidate_name: {
        type: String,
        required: true,
        minlength: 3,
    },

    course: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    },

    marks: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
    },

    password: {
        type: String,
        required: true,   
        minlength: 6,
    },
});

module.exports = mongoose.model('Student', studentSchema);