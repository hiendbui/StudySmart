import * as APIUtil from '../util/quiz_api_util';

export const RECEIVE_ALL_QUIZZES = "RECEIVE_ALL_QUIZZES";
export const RECEIVE_QUIZ = "RECEIVE_QUIZ";
export const REMOVE_QUIZ = "REMOVE_QUIZ";

const receiveAllQuizzes = quizzes => ({
    type: RECEIVE_ALL_QUIZZES,
    quizzes
});

const receiveQuiz = data => ({
    type: RECEIVE_QUIZ,
    quiz: data.quiz,
    flashcards: data.quiz.flashcards
})

const removeQuiz = quizId => ({
    type: REMOVE_QUIZ,
    quizId
})


export const fetchAllQuizzes = () => dispatch => (
    APIUtil.fetchAllQuizzes()
        .then(quizzes => dispatch(receiveAllQuizzes(quizzes)))
);

export const fetchQuiz = id => dispatch => (
    APIUtil.fetchQuiz(id)
        .then(payload => dispatch(receiveQuiz(payload.data)))
);

// export const createQuiz = quiz => {
//     return axios.post('api/quizzes', quiz)
// };

// export const deleteQuiz = id => {
//     return axios.delete(`api/quizzes/${id}`);
// };

// export const updateQuiz = (id, quiz) => {
//     return axios.patch(`api/quizzes/${id}`, quiz);
// };