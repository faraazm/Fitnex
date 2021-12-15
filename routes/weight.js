const express = require('express')
const router = express.Router()
const moment = require('moment')
const mongoose = require('mongoose')
const Weight = mongoose.model('Weight')

const passport = require('passport')
const requireAuth = passport.authenticate('jwt', { session: false })

router.get('/:days', requireAuth, async (req, res) => {
  const { days } = req.params

  const startOfDate = moment(new Date()).subtract(days, "days")
  const endOfDate = moment.utc(new Date().toISOString()).endOf('day')
  
  let weights = []

  console.log(startOfDate.toISOString())
  console.log(endOfDate.toISOString())

  if (days === 'all') {
    weights = await Weight.find({ userId: req.user.id }).limit('').sort({ created_at: 'asc' })
  } else {
    weights = await Weight.find({
      userId: req.user.id,
      created_at: {
        $gte: startOfDate.toISOString(),
        $lte: endOfDate.toISOString(),
      },
    }).sort({ created_at: 'asc' })
  }

  if (weights) {
    res.status(200).send(weights)
  } else {
    res.send({ "message": "No weights found." })
  }
})

router.post('/log', requireAuth, async (req, res) => {
  const { weight, date } = req.body
  const weightLog = new Weight({ userId: req.user.id, weight, date })
  const savedWeight = await weightLog.save()
  if (savedWeight) {
    res.status(200).send(savedWeight)
  } else {
    res.send({ "message": "Unable to log weight." })
  }
})

router.delete('/remove', requireAuth, async (req, res) => {
  const weightDeleted = await Weight.findOneAndDelete({}, { sort: { _id: -1 } })
  if (weightDeleted) {
    res.status(200).send(weightDeleted)
  } else {
    res.send({ "message": "Unable to delete weight." })
  }
})

module.exports = router
