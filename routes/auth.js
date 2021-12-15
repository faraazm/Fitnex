require('dotenv').config();
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model('User')
const jwt = require('jsonwebtoken')
const keys = require('../config/keys')

const passport = require('passport')
const requireAuth = passport.authenticate('jwt', { session: false })

function tokenForUser(user) {
  const timestamp = new Date().getTime()
  return jwt.sign({ sub: user._id, iat: timestamp }, keys.secret)
}

router.post('/signUp', async (req, res) => {
  const { email, password } = req.body
  const newUser = new User({ email, password })

  if (!email || !password) {
    return res.status(422).send({ error: 'You must fill in all the required fields.' })
  }

  const existingUser = await User.findOne({ email })
  if (existingUser) {
    return res.status(422).send({ error: 'Email already in use.' })
  } else {
    const user = await newUser.save()
    const { completedMeasurements } = user
    const token = tokenForUser(user)
    res.status(200).send({ token, completedMeasurements })
  }
})

router.post('/signIn', async (req, res, next) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (!user) {
    res.status(404).json({ error: 'Incorrect Email or Password. Please try again.' })
  } else {
    const isMatch = await user.isProperPassword(password)
    if (isMatch) {
      const token = tokenForUser(user)
      res.status(200).send({
        token,
        completedMeasurements: user.completedMeasurements
      })
    } else {
      res.status(401).send({ error: 'No matching records were found. Please try again.' })
    }
  }
})

router.get('/current_user', requireAuth, (req, res, next) => {
  res.status(200).send({
    id: req.user.id,
    email: req.user.email,
    name: req.user.name,
    age: req.user.age,
    activity: req.user.activity,
    calorieIntake: req.user.calorieIntake,
    gender: req.user.gender,
    weight: req.user.weight,
    height: req.user.height,
    completedMeasurements: req.user.completedMeasurements,
  })
})

module.exports = router
