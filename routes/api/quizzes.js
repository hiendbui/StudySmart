const express = require('express');
const router = express.Router();
const Quiz = require('../../models/Quiz');
const validateQuizInput = require('../../validation/quizzes');

router.get('/', (req, res) => {
    Quiz.find()
        .then(quizzes => res.json(quizzes))
        .catch(err => res.status(404).json({ noquizzesfound: 'No quizzes found' }));
});

router.post('/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      const { errors, isValid } = validateQuizInput(req.body);
  
      if (!isValid) {
        return res.status(400).json(errors);
      }
  
      const newQuiz = new Quiz({
        topic: req.body.topic,
        description: req.body.description
      });
      
      newQuiz.save().then(quiz => res.json(quiz));
    }
);

module.exports = router;