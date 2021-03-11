import { combineReducers } from 'redux';
import QuizzesReducer from './quizzes_reducer';
import FlashcardsReducer from './flashcard_reducer';

export default combineReducers({
  quizzes: QuizzesReducer,
  flashcards: FlashcardsReducer
});