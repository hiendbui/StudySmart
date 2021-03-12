import {
  RECEIVE_ALL_QUIZZES,
  RECEIVE_QUIZ,
  REMOVE_QUIZ
} from '../actions/quiz_actions';

const QuizzesReducer = (state = {}, action) => {
  Object.freeze(state);
  const newState = {...state};
  switch(action.type) {
    case RECEIVE_ALL_QUIZZES:
        return action.quizzes;
    case RECEIVE_QUIZ:
        delete action.quiz.flashcards;
        newState[action.quiz._id] = action.quiz;
        return newState;
    case REMOVE_QUIZ:
        delete newState[action.quizId];
        return newState;
    default:
      return state;
  }
};

export default QuizzesReducer;