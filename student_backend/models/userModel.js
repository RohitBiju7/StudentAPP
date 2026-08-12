const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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

// Hash password before saving
studentSchema.pre('save', async function() {
    // Only hash if password has been modified
    if (!this.isModified('password')) {
        return;
    }

    try {
        // Generate salt and hash password
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
        throw error;
    }
});

// Method to compare passwords
studentSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('Student', studentSchema);