const mongoose = require('mongoose');

const EventSchema = mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    tags: [String],
    userID: String,
    date: Date
});

module.exports = mongoose.model('Event', EventSchema);