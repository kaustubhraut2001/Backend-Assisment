const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
    startTime: {
        type: Date,
        required: true,
    },
    isAvailable: {
        type: Boolean,
        required: true,
        default: true,
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        default: null,
    },
});

const deanSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    universityId: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    availableSlots: [slotSchema],
});

module.exports = mongoose.model('Dean', deanSchema);
// module.exports = mongoose.model('Slot', slotSchema);