const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const morgan = require('morgan')
const path = require('path')
const cors = require("cors");
const keys = require('./config/keys')
// Loads Environment Variables
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

//Models
mongoose.model('User', require('./models/User'));
mongoose.model('FoodItem', require('./models/FoodItem'));
mongoose.model('Activity', require('./models/Activity'));
mongoose.model('Meal', require('./models/Meal'));
mongoose.model('Weight', require('./models/Weight'));

// Connecting to DB
mongoose.connect(keys.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true}, err => {
  if (err) throw err;
  else console.log('Successfully connected to MongoDB');
});

// CORS
app.use(cors({
  origin:'*', 
  credentials:true,
  optionSuccessStatus:200,
}))

// Logger
app.use(morgan('tiny'))

// Body Parser
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// Passport Setup - Used to protect your routes
app.use(passport.initialize());
require('./services/passport')(passport);

// Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/foods', require('./routes/food'))
app.use('/api/activity', require('./routes/activity'))
app.use('/api/onboarding', require('./routes/onboarding'))
app.use('/api/weight', require('./routes/weight'))

app.use(express.static(path.join(__dirname, "client", "build")))

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// Server Listening
app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`)
})