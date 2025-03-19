const express = require('express');
const router = express.Router();
const QuizQuestion = require('../models/questions');
const GameScore = require('../models/playerscore');

//Get list of questions from db
router.get('/gamequestions', function(req, res, next){
    QuizQuestion.find({}).then(function(question){
        res.send(question);
    });
});

//Add new question to db
router.post('/gamequestions', function(req, res, next){
    QuizQuestion.create(req.body).then(function(question){
        res.send(question);
    }).catch(next);
});

//Update a question in db
router.put('/gamequestions/:id', function(req,res, next){
    QuizQuestion.findByIdAndUpdate({_id: req .params.id}, req.body).then(function(){
        // Callback function. The updated content of the question is collected to show
        QuizQuestion.findOne({_id:req.params.id}).then(function(question){
            res.send(question);
        }).catch(next);
    });
});

//Removes question from db
router.delete('/gamequestions/:id', function(req, res, next){
    QuizQuestion.findByIdAndDelete({_id: req.params.id}).then(function(question){
        res.send(question);
    });
});

//Get list of playerscores from db
router.get('/playerScore', async (req, res, next) => {
    try {
        const scores = await GameScore.find().sort({ score: -1 }).limit(10);
        res.json(scores);
    } catch (err) {
        rest.status(500).json({ message: err.message });
    }
    });

//Add new playerscore to db
router.post('/playerScore', async function(req, res) {
        const newPlayerEntry = new GameScore({
        name: req.body.name,
        score: req.body.score
    });

    try {
        const newScore = await newPlayerEntry.save();
        res.status(201).json(newScore);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/playerScore', function(req, res, next){
    GameScore.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
        GameScore.findOne({_id:req.params.id}).then(function(playerscore){
            res.send(playerscore);
        }).catch(next);
    });
})

//Removes question from db
router.delete('/playerscore/:id', function(req,res, next){
    GameScore.findByIdAndDelete({_id: req.params.id}).then(function(playerscore){
        res.send(playerscore);
    }).catch(next);
});

module.exports = router;