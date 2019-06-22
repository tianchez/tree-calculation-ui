'use strict';

const express = require('express');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var cors = require("cors");

var userService = require('./service/userService');
var treeService = require('./service/treeService');


const config = require('./config');



// Constants
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

// App
const app = express();
var db;

mongoose.connect(config.MONGO_URI, { useNewUrlParser: true }, (err, mongodb)=>{
    if (err){
        console.log('Error: Could not connect to MongoDB. ' + err);
        return;
    }
    db = mongodb;
    console.log("MongoDB is connected");
});

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


app.get('/', (req, res) => {
  res.send('Hello world\n');
});


app.get('/login', userService.checkToken, (req, res)=> {
    console.log("hahaha");
        res.json({
            success: true,
            message: 'Index page'
        });
    }
);

app.post('/calculate', (req, res) => {
    treeService.calculateTreeSum(req, res)
 })

app.post('/login', (req, res) => {
    var credential = {
       username:req.body.username,
       password:req.body.password
    };
    if (credential.username && credential.password){
        userService.login(req, res, db);
    }
 })

 app.post('/signup', (req, res) => {
    var credential = {
       username:req.body.username,
       password:req.body.password
    };
    if (credential.username && credential.password){
        userService.signup(req, res, db);
    }
 })


app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);