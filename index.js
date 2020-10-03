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
const axios = require("axios");
dotenv.config();

const publicVapidKey = process.env.VAPID_PUBLIC_KEY;
const privateVapidKey = process.env.VAPID_PRIVATE_KEY;

// Replace with your email
webpush.setVapidDetails('mailto:ashayp22@gmail.com', publicVapidKey, privateVapidKey);


app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "covidheal.org"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


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

app.post('/newsdata', function (req, res) { //handles get request

  var loc = req.body.loc;
  console.log("here")

  axios({
    "method":"GET",
    "url":"https://coronavirus-smartable.p.rapidapi.com/news/v1/" + loc + "/",
    "headers":{
    "content-type":"application/octet-stream",
    "x-rapidapi-host":"coronavirus-smartable.p.rapidapi.com",
    "x-rapidapi-key":process.env.SMARTABLE_KEY,
    "useQueryString":true
    }
    })
    .then((response)=>{
      res.json({news: response["data"]["news"]})
    })
    .catch((error)=>{
      console.log(error)
    })
})

app.post('/newsdata', function (req, res) { //handles get request

  var loc = req.body.loc;

  axios({
    "method":"GET",
    "url":"https://coronavirus-smartable.p.rapidapi.com/news/v1/" + loc + "/",
    "headers":{
    "content-type":"application/octet-stream",
    "x-rapidapi-host":"coronavirus-smartable.p.rapidapi.com",
    "x-rapidapi-key":process.env.SMARTABLE_KEY,
    "useQueryString":true
    }
    })
    .then((response)=>{
      res.json({news: response["data"]["news"]})
    })
    .catch((error)=>{
      console.log(error)
    })
})

app.post('/newsstats', function (req, res) { //handles get request

  var loc = req.body.loc;

  axios({
    "method":"GET",
    "url":"https://coronavirus-smartable.p.rapidapi.com/stats/v1/" + loc + "/",
    "headers":{
    "content-type":"application/octet-stream",
    "x-rapidapi-host":"coronavirus-smartable.p.rapidapi.com",
    "x-rapidapi-key":process.env.SMARTABLE_KEY,
    "useQueryString":true
    }
    })
    .then((response)=>{
      res.json({stats: response["data"]["stats"]})
    })
    .catch((error)=>{
      console.log(error)
    })
})



app.listen(PORT, function () {
  console.log('go to http://localhost:3000/')
})
