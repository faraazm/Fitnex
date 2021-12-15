const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const FoodItem = mongoose.model('FoodItem')
const Meal = mongoose.model('Meal')
const Activity = mongoose.model('Activity')

const passport = require('passport')
const requireAuth = passport.authenticate('jwt', { session: false })

const moment = require('moment')

// get all food items
router.get('/', requireAuth, async (req, res) => {
  const foods = await FoodItem.find()
  if (foods) {
    res.status(200).send(foods)
  } else {
    res.send({ message: 'No food items found.' })
  }
})

router.post('/create', requireAuth, async (req, res) => {
  const { name, protein, carbs, fats } = req.body
  const food = new FoodItem({
    name,
    protein,
    carbs,
    fats,
    calories: protein * 4 + carbs * 4 + fats * 9,
  })

  const saved = await food.save()
  if (saved) {
    res.status(200).send({ message: 'Food item was created!', food: saved })
  } else {
    res.send({ message: 'Unable to create food item.' })
  }
})

router.get('/meals/:date', requireAuth, async (req, res) => {
  const { date } = req.params

  const startOfDate = moment(date).startOf('day')
  const endOfDate = moment(startOfDate).endOf('day')

  const meals = await Meal.find({
    userId: req.user.id,
    created_at: {
      $gte: startOfDate.toISOString(),
      $lte: endOfDate.toISOString(),
    },
  }).sort('-created_at')

  if (meals) {
    res.status(200).send(meals)
  } else {
    res.send({ message: 'No meals found.' })
  }
})

router.delete('/meals/:id', requireAuth, async (req, res) => {
  const { id } = req.params

  const deletedMeal = await Meal.findOneAndDelete({ _id: id })

  if (deletedMeal) {
    res.status(200).send(deletedMeal)
  } else {
    res.send({ message: `Could not delete meal with ID: ${id}` })
  }
})

router.post('/log', requireAuth, async (req, res) => {
  const { foodId } = req.body
  const foodItem = await FoodItem.findOne({ _id: foodId })
  const meal = new Meal({
    userId: req.user.id,
    name: foodItem.name,
    protein: foodItem.protein,
    carbs: foodItem.carbs,
    fats: foodItem.fats,
    calories: foodItem.calories,
  })
  const saved = await meal.save()
  if (saved) {
    res.status(200).send(saved)
  } else {
    res.send({ message: 'Unable to log meal.' })
  }
})

router.get('/calorie-statistics', requireAuth, async (req, res) => {
  let caloriesConsumed, caloriesBurnt, caloriesRemaining
  let caloricIntake = req.user.calorieIntake
  const today = new Date()

  const startOfToday = moment(today).startOf('day')
  const endOfToday = moment(today).endOf('day')

  const searchCriteria = {
    userId: [req.user.id],
    created_at: {
      $gte: startOfToday.toISOString(),
      $lte: endOfToday.toISOString(),
    },
  }

  const meals = await Meal.find(searchCriteria)
  const exercises = await Activity.find(searchCriteria)

  if (meals.length) {
    let { calories } = meals.reduce((prev, current) => {
      return { calories: prev.calories + current.calories }
    })

    caloriesConsumed = calories
  } else {
    caloriesConsumed = 0
  }

  if (exercises.length) {
    let { calories } = exercises.reduce((prev, current) => {
      return { calories: prev.calories + current.calories }
    })

    caloriesBurnt = calories
  } else {
    caloriesBurnt = 0
  }

  caloriesRemaining = caloricIntake - caloriesConsumed + caloriesBurnt
  res.status(200).send({
    caloriesConsumed: Math.round(caloriesConsumed * 100 + Number.EPSILON) / 100,
    caloriesBurnt: Math.round(caloriesBurnt * 100 + Number.EPSILON) / 100,
    caloriesRemaining: Math.round(caloriesRemaining * 100 + Number.EPSILON) / 100,
  })

})

router.get('/macros', requireAuth, async (req, res) => {
  const today = new Date()
  const startOfToday = moment(today).startOf('day')
  const endOfToday = moment(today).endOf('day')

  const meals = await Meal.find({
    userId: req.user.id,
    created_at: {
      $gte: startOfToday.toISOString(),
      $lte: endOfToday.toISOString(),
    },
  })

  if (meals.length) {
    const macros = meals.reduce((prev, current) => {
      return {
        carbs: prev.carbs + current.carbs,
        protein: prev.protein + current.protein,
        fats: prev.fats + current.fats
      }
    })

    res.status(200).send({
      carbs: macros.carbs,
      protein: macros.protein,
      fats: macros.fats
    })
  } else {
    res.send({ "message": "There was an error calculating your macrobreakdown. Perhaps there are no food items logged for today." })
  }
})

module.exports = router
