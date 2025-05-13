const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const fs = require('fs');
const router = express.Router();
const cors = require('cors');


const mongoose = require('mongoose');

// set up express app
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());


// connect to MongoDB
const uri = 'mongodb+srv://kurterikhedqvist:1Ys0CS6xApJjbAI5@kurterikcluster.sj4u9.mongodb.net/';
const client = new MongoClient('mongodb+srv://kurterikhedqvist:1Ys0CS6xApJjbAI5@kurterikcluster.sj4u9.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });

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

app.post('/saveScore', async (req, res) => {
    const score = req.body;
    try {
        await client.connect();
        const database = client.db('IdiotKnowledge');
        const collection = database.collection('playerScore');
        await collection.insertOne(score);

        // Call fetchAndSaveData after saving the score
        await fetchAndSaveData();

        res.status(200).send('Score has been saved to the database and playerScore.json updated');
    } catch (error) {
        res.status(500).send('Error saving score to the database');
    } finally {
        await client.close();
    }
});
// listen for requests
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//Helper Function for fetching the updated list of scores