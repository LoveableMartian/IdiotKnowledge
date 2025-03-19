const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlayerScoreSchema = new Schema({
    name: {
        type: String,
        required: [true, 'please write down a player name']
    },
    score: {
        type: Number,
        required: [true]
    }
})

// Model
const GameScore = mongoose.model('playerscore', PlayerScoreSchema);

module.exports = GameScore;