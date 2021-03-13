import {
  RECEIVE_QUIZ,
  REMOVE_QUIZ
} from '../actions/quiz_actions';
import { 
  RECEIVE_FLASHCARD,
  REMOVE_FLASHCARD
} from '../actions/flashcard_actions';

const FlashcardsReducer = (state = {}, action) => {
  Object.freeze(state);
  const newState = {...state}
  switch(action.type) {
    case RECEIVE_QUIZ:
        if (!action.flashcards) return state;
        const cardsObj = {};
        action.flashcards.forEach(flashcard => cardsObj[flashcard._id] = flashcard);
        return cardsObj;
    case REMOVE_QUIZ:
        return {};
    case RECEIVE_FLASHCARD:
        const flashcard = {[action.flashcard._id]: action.flashcard}
        return {...newState, ...flashcard};
    case REMOVE_FLASHCARD:
        delete newState[action.flashcardId];
        return newState;
    default:
      return state;
  }
};

export default FlashcardsReducer;