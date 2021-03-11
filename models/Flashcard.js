const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FlashcardSchema = new Schema({
    quiz: {
        type: Schema.Types.ObjectId,
        ref: 'Quiz',
        required: true
    },
    front: {
        type: String,
        required: true
    },
    back: {
        type: String,
        required: true
    },
}, {
  timestamps: true
})

const Flashcard = mongoose.model('Flashcard', FlashcardSchema);
module.exports = Flashcard;