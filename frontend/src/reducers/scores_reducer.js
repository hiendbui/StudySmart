import { RECEIVE_SCORES } from '../actions/score_actions';
import { REMOVE_QUIZ } from '../actions/quiz_actions';

const ScoresReducer = (state = {}, action) => {
  Object.freeze(state);

  switch(action.type) {
    case RECEIVE_SCORES:
        return action.scores;
    case REMOVE_QUIZ:
        return {};
    default:
      return state;
  }
};

export default ScoresReducer;