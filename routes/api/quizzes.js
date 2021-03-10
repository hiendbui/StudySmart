const express = require('express');
const router = express.Router();
const Quiz = require('../../models/Quiz');

router.get("/quizzes", (req, res) => {
    Quiz.find()
        .then(quizzes => res.json(quizzes))
        .catch(err => res.status(404).json({ noquizzesfound: 'No quizzes found' }));
});

module.exports = router;