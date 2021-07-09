const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

router.get('/', async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch(err) {
        res.json({message: err});
    }
});

router.post('/', async (req,res) => {
    const event = new Event({
        description: req.body.description,
        tags: req.body.tags,
        userID: req.body.userID
    });

    try {
        const savedEvent = await event.save();
        res.json(savedEvent);
    } catch(err) {
        res.json({message: err});
    }

});

module.exports = router;