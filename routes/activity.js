const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Activity = mongoose.model('Activity');

const passport = require('passport');
const requireAuth = passport.authenticate('jwt', { session: false });

const moment = require('moment');

router.get('/:date', requireAuth, async (req, res) => {
    const { date } = req.params

    const startOfDate = moment(date).startOf('day')
    const endOfDate = moment(startOfDate).endOf('day');

    const activities = await Activity.find({
        userId: req.user.id, created_at: {
            $gte: startOfDate.toISOString(),
            $lte: endOfDate.toISOString()
        }
    })

    if (activities) {
        res.status(200).send(activities);
    } else {
        res.send({
            "message": "No activities found"
        })
    }
});

router.post('/log', requireAuth, async (req, res) => {
    const { calories } = req.body
    const activity = new Activity({ userId: req.user.id, calories })

    const savedActivity = await activity.save()
    if(savedActivity) {
        res.status(200).send(savedActivity);
    } else {
        res.send({
            "message": "Unable to log activity. Please try again"
        })
    }
});

router.delete('/remove/:id', requireAuth, async (req, res) => {
    const { id } = req.params
    const deletedActivity = await Activity.findOneAndDelete({ _id: id })

    if(deletedActivity) {
        res.status(200).send(deletedActivity)
    } else {
        res.send({ "message": `Could not delete activity with ID: ${id}` })
    }
})

module.exports = router;