const PORT = process.env.PORT || 3000; //either heroku port or local port
const express = require('express');
const bodyParser = require('body-parser');
const app = express()
const formidable = require('formidable');
const fs = require('fs');
const path = require('path')
const exec = require('child_process').exec;


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) { //handles get request
  res.render('home');
})

app.get('/home', function (req, res) { //handles get request
  res.render('home');
})

app.get('/camera', function (req, res) { //handles get request
  res.render('ml');
})

app.get('/moral', function (req, res) { //handles get request
  res.render('moral');
})

app.get('/data', function (req, res) { //handles get request
  res.render('cookies');
})

app.listen(PORT, function () {
  console.log('go to http://localhost:3000/')
})
