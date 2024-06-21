// index.js
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const Feedback = require('./models/Feedback.js');
const auth = require('./routes/auth');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(5000, () => {
  console.log('Server started on port 5000');
});
