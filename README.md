<h1>StudySmart</h1> 

<a href="https://studysmartnow.herokuapp.com/" target="_blank">Live Link</a>

## Technologies
* MongoDB
* Express.js
* Node.js
* React
* Redux

## Integrations
* Storage
* Server-side Web API
* Client (UI/UX)
* Auth (Authentication/Authorization)


## Data Schema
```javascript
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
}, {
  timestamps: true
})

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


const FlashcardSchema = new Schema({
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
```
