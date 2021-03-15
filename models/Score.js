const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScoreSchema = new Schema({
    username: { 
        type: String, 
        required: true
    },
    percentage: {
        type: Number,
        required: true
    },
}, {
  timestamps: true
})

const Score = mongoose.model('Score', ScoreSchema);
module.exports = Score;