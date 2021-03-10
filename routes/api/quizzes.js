const express = require('express');
const router = express.Router();
const passport = require('passport');
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

router.delete('/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {

        Quiz.deleteOne({_id: req.params.id})
            .then(() => {
                res.json({ id: req.params.id, message: 'Deleted!' });
            })
            .catch(error => {
                res.status(400).json({ error });
            });
    }
);

router.patch('/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = validateQuizInput(req.body);
    
        if (!isValid) {
            return res.status(400).json(errors);
        }

        Quiz.findById(req.params.id)
            .then(quiz => {
                quiz.topic = req.body.topic;
                quiz.description = req.body.description;
                quiz.save().then(quiz => res.json(quiz));
            })
            .catch(err =>
                res.status(404).json({ noquizzesfound: 'No quiz found with that ID' })
            )
    }
);

module.exports = router;