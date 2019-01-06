'use strict';
const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const requireLogin = require('./middleware/requireLogin');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());


// Search Result
app.post('/result', requireLogin, async (req,res) => {

  const location = req.body.location;

  const yelp = axios.create({
    baseURL: 'https://api.yelp.com/v3'
  });
  
  yelp.defaults.headers.common['Authorization'] = 'Bearer ' + keys.yelpApiKey;
  
  const response = await yelp.get(`/businesses/search?location=${location}&limit=50`);
  res.send(response.data);
});

// Detail Page Result
app.post('/detail', requireLogin, async (req,res) => {

  const id = req.body.id;

  const yelp = axios.create({
    baseURL: 'https://api.yelp.com/v3/'
  });
  
  yelp.defaults.headers.common['Authorization'] = 'Bearer ' + keys.yelpApiKey;
  
  const response = await yelp.get(`/businesses/${id}`);
  res.send(response.data);
});

require('./routes/authRoutes')(app);

if (process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  }); 
}

const PORT = process.env.PORT || 5000;

app.listen(PORT);