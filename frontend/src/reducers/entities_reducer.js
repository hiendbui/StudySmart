import { combineReducers } from 'redux';

import QuizzesReducer from './quizzes_reducer';

export default combineReducers({
  quizzes: QuizzesReducer
});