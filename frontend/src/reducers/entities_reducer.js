import { combineReducers } from 'redux';
import QuizzesReducer from './quizzes_reducer';
import FlashcardsReducer from './flashcards_reducer';
import ScoresReducer from './scores_reducer';

export default combineReducers({
  quizzes: QuizzesReducer,
  flashcards: FlashcardsReducer,
  scores: ScoresReducer
});