const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    universityId: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
    },
});

module.exports = mongoose.model('Student', studentSchema);