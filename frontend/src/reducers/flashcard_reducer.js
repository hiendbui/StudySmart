import {
  RECEIVE_QUIZ,
  REMOVE_QUIZ
} from '../actions/quiz_actions';

const FlashcardsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_QUIZ:
        if (!action.flashcards) return state;
        const cardsObj = {};
        action.flashcards.forEach(flashcard => cardsObj[flashcard._id] = flashcard);
        return cardsObj;
    case REMOVE_QUIZ:
        return {};
    default:
      return state;
  }
};

export default FlashcardsReducer;