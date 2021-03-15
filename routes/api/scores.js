const express = require('express');
const router = express.Router();
const passport = require('passport');
const Score = require('../../models/Score');
const Quiz = require('../../models/Quiz')


// save score for a given quiz
router.post('/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      const newScore = new Score({
        username: req.body.username,
        percentage: req.body.percentage
      });
      
      newScore.save().then(score => {
          //find quiz with Id and append score id to its 'scores' property
          console.log(score);
          Quiz.findById(req.body.quiz)
            .then(quiz => {
                quiz.scores.push(score.id);
                quiz.save();
            });
          return res.json(score);
      });
    }
);

//get all scores for particular quiz
router.get('/quiz/:quizId', (req, res) => {
    Quiz.findById(req.params.id)
        .populate('scores')
        .then(quiz => res.json(quiz.scores))
        .catch(err =>
            res.status(404).json({ noquizzesfound: 'No quiz found with that ID' })
        )
});