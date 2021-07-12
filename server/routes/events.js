const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

//Get all events
router.get('/', async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch(err) {
        res.json({message: err});
    }
});

//Add event to database
router.post('/', async (req,res) => {
    const event = new Event({
        description: req.body.description,
        tags: req.body.tags,
        submitterID: req.body.submitterID,
        requestedUsers: req.body.requestedUsers,
        joinedUsers: req.body.joinedUsers,
        date: req.body.date
    });

    try {
        const savedEvent = await event.save();
        res.json(savedEvent);
    } catch(err) {
        res.json({message: err});
    }

});

//Delete event by ID
router.delete('/:postID', async (req,res) => {
    try {
        const removedEvent = await Event.deleteOne({_id: req.params.postID});
        res.json(removedEvent);
    } catch(err) {
        res.json({message: err});
    }
});

//Adds requested user(s) to event by ID
router.patch('/addRequestedUser/:postID', async(req, res) => {
    console.log(req.params.postID);
    try {
        const updatedEvent = await Event.updateOne(
            {_id: req.params.postID}, 
            {$push: {requestedUsers : req.body.requestedUser}}
        );
        res.json(updatedEvent);
    } catch(err) {
        res.json({message : err});
    } 
});

/* 
TODO:
- Change requested user to a joined user
- Remove joined user
- Reject requested user
- Edit description
- Edit tags
*/

module.exports = router;