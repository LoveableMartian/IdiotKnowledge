const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
const fs = require('fs');

// set up express app
const app = express();

// connect to MongoDB
mongoose.connect("mongodb://localhost/idiotknowledge2");
mongoose.Promise = global.Promise;

const uri = 'mongodb+srv://kurterikhedqvist:1Ys0CS6xApJjbAI5@kurterikcluster.sj4u9.mongodb.net/'; // Replace with your MongoDB connection string
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Fetches both questions and player scores from the database and saves them to separate JSON files
async function fetchAndSaveData() {
    try {
      await client.connect();
      const database = client.db('IdiotKnowledge');
      const collection = database.collection('playerScore');
  
      const playerScores = await collection.find().toArray();
  
      fs.writeFile('playerScore.json', JSON.stringify(playerScores, null, 2), (err) => {
        if (err) throw err;
        console.log('Data has been written to playerScore.json');
      });

      const collection2 = database.collection('gamequestions');
  
      const gameQuestionsFormat = await collection2.find().toArray();
  
      fs.writeFile('questions.json', JSON.stringify(gameQuestionsFormat, null, 2), (err) => {
        if (err) throw err;
        console.log('Data has been written to questions.json');
      });
    } finally {
      await client.close();
    }
  }
fetchAndSaveData().catch(console.error);

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

