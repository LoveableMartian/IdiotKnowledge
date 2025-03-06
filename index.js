const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// set up express app
const app = express();

// connect to MongoDB
mongoose.connect('mongodb://localhost/idiotknowledge2');
mongoose.Promise = global.Promise;

//Initializes body parser to handle json data requests
app.use(bodyParser.json());

// initialize routes
app.use('/api', require('./routes/api'));

// error handling middleware
app.use(function(err, req, res, next){
    res.status(422).send({error: err.message});
});

// listen for requests
app.listen(4000,function(){
    console.log('listening for requests');
});
