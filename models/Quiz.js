const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuizSchema = new Schema({
    topic: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    flashcards: [{
        type: Schema.Types.ObjectId,
        ref: 'Flashcard'
    }],
    scores: [{
        type: Schema.Types.ObjectId,
        ref: 'Score'
    }]
}, {
  timestamps: true
})

const Quiz = mongoose.model('Quiz', QuizSchema);
module.exports = Quiz;
