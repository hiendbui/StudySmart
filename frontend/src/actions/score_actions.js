import * as APIUtil from '../util/score_api_util';

export const RECEIVE_SCORES = "RECEIVE_FLASHCARD";


const receiveScores = scores => ({
    type: RECEIVE_SCORES,
    scores
});


export const fetchScores = quizId => dispatch => (
    APIUtil.fetchScores(quizId)
        .then(res => dispatch(receiveScores(res.data)))
)