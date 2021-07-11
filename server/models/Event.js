const mongoose = require('mongoose');

/* 
Database schema for Event object
-------------------------------------------------------------------------------------------------
description: description for event
tags: categories for event
submitterID: user ID of the event submitter
requestedUsers: user IDs of the users who have requested to join the event
joinedUsers: user IDs of the users whose request to join the event were accepted by the submitter
date: time the event was posted
*/

const EventSchema = mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    tags: [String],
    submitterID: {
        type: String,
        required: true
    },
    requestedUsers: [String],
    joinedUsers: [String],
    date: Date
});

module.exports = mongoose.model('Event', EventSchema);