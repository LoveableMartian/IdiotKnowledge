const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create Question Schema & model
const QuestionSchema = new Schema({
    question: {
        type: String,
        required: [true,'Answers require questions']
    },
    correct_answer: {
        type: String,
        required: [true,'Questions require correct answer']
    },
    incorrect_answers: {
        type: Array,
        required: [true,'Questions require incorrect answers']
    }
})

// Model
const QuizQuestion = mongoose.model('gamequestions', QuestionSchema);

module.exports = QuizQuestion;