const express = require('express');
const router = express.Router();
const QuizQuestion = require('../models/questions');
const GameScore = require('../models/playerscore');

//Get let of questions from db
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

//Get let of playerscores from db
router.get('/playerscore', function(req, res, next){
    GameScore.find({}).then(function(playerscore){
        res.send(playerscore);
    });
});

//Add new playerscore to db
router.post('/playerscore', function(req, res, next){
    GameScore.create(req.body).then(function(playerscore){
        res.send(playerscore);
    }).catch(next);
});

router.put('/playerscore', function(req, res, next){
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