const PORT = process.env.PORT || 3000; //either heroku port or local port
const express = require('express');
const bodyParser = require('body-parser');
const app = express()
const formidable = require('formidable');
const fs = require('fs');
const path = require('path')
const exec = require('child_process').exec;
const webpush = require("web-push")
const dotenv = require('dotenv');
dotenv.config();

const publicVapidKey = process.env.VAPID_PUBLIC_KEY;
const privateVapidKey = process.env.VAPID_PRIVATE_KEY;

// Replace with your email
webpush.setVapidDetails('mailto:ashayp22@gmail.com', publicVapidKey, privateVapidKey);


app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')


app.post('/alert', (req, res) => {
  const subscription = req.body;
  res.status(201).json({});
  const payload = JSON.stringify({ title: 'Please stop touching your face!', body: "It's for your safety!", image: "https://images.homedepot-static.com/productImages/a94ca394-40a5-47ae-973c-8c76b9d4dcb3/svn/lynch-sign-stock-signs-stop-64_1000.jpg"});

  webpush.sendNotification(subscription, payload).catch(error => {
    console.error(error.stack);
  });
});

app.get('/', function (req, res) { //handles get request
  res.render('home');
})

app.get('/home', function (req, res) { //handles get request
  res.render('home');
})

app.get('/camera', function (req, res) { //handles get request
  res.render('ml');
})

app.get('/relax', function (req, res) { //handles get request
  res.render('moral');
})


app.get('/news', function (req, res) { //handles get request
  res.render('news');
})

app.get('/team', function (req, res) { //handles get request
  res.render('team');
})

app.get('/termsofservice', function (req, res) { //handles get request
  res.render('tos');
})

app.get('/privatepolicy', function (req, res) { //handles get request
  res.render('policy');
})

app.get('/foldingathome', function (req, res) { //handles get request
  res.render('folding');
})

app.listen(PORT, function () {
  console.log('go to http://localhost:3000/')
})
