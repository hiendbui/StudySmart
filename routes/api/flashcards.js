const express = require('express');
const router = express.Router();
const passport = require('passport');
const Flashcard = require('../../models/Flashcard');
const Quiz = require('../../models/Quiz')


// create flashcard for a given quiz
router.post('/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      const newFlashcard = new Flashcard({
        front: req.body.front,
        back: req.body.back
      });
      
      newFlashcard.save().then(flashcard => {
          //find quiz with Id and append flashcard id to its 'flashcards' property
          console.log(flashcard);
          Quiz.findById(req.body.quiz)
            .then(quiz => {
                quiz.flashcards.push(flashcard.id);
                quiz.save();
            });
          return res.json(flashcard)
      });
    }
);

router.delete('/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Flashcard.deleteOne({_id: req.params.id})
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
        Flashcard.findById(req.params.id)
            .then(flashcard => {
                flashcard.front = req.body.front;
                flashcard.back = req.body.back;
                flashcard.save().then(flashcard => res.json(flashcard));
            })
            .catch(err =>
                res.status(404).json({ noflashcardsfound: 'No flashcard found with that ID' })
            )
    }
);

module.exports = router;