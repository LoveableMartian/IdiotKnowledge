const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create Question Schema & model
const QuestionSchema = new Schema({
    question: {
        type: String,
        required: [true,'Answers require questions']
    },
    choice1: {
        type: String,
        required: [true,'Questions require answers (1)']
    },
    choice2: {
        type: String,
        required: [true,'Questions require answers (2)']
    },
    choice3: {
        type: String,
        required: [true,'Questions require answers (3)']
    },
    choice4: {
        type: String,
        required: [true,'Questions require answers (4)']
    },
    answer: {
        type: Number,
        required: [true,'Questions require answers (4)']
    }
})

// Model
const QuizQuestion = mongoose.model('gamequestions', QuestionSchema);

module.exports = QuizQuestion;