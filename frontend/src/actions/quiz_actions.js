import * as APIUtil from '../util/quiz_api_util';

export const RECEIVE_ALL_QUIZZES = "RECEIVE_ALL_QUIZZES";
export const RECEIVE_QUIZ = "RECEIVE_QUIZ";
export const REMOVE_QUIZ = "REMOVE_QUIZ";

const receiveAllQuizzes = quizzes => ({
    type: RECEIVE_ALL_QUIZZES,
    quizzes
});

const receiveQuiz = quiz => ({
    type: RECEIVE_QUIZ,
    quiz,
    flashcards: quiz.flashcards
})

export const removeQuiz = quizId => ({
    type: REMOVE_QUIZ,
    quizId
})


export const fetchAllQuizzes = () => dispatch => (
    APIUtil.fetchAllQuizzes()
        .then(quizzes => dispatch(receiveAllQuizzes(quizzes.data)))
);

export const fetchQuiz = id => dispatch => (
    APIUtil.fetchQuiz(id)
        .then(res => dispatch(receiveQuiz(res.data.quiz)))
);

export const createQuiz = quiz => dispatch => (
    APIUtil.createQuiz(quiz)
        .then(res => dispatch(receiveQuiz(res.data)))
);

export const deleteQuiz = id => dispatch => {
    APIUtil.deleteQuiz(id)
        .then(()=> dispatch(removeQuiz(id)));
};

export const updateQuiz = (id, quiz) => dispatch => {
     APIUtil.updateQuiz(id, quiz)
        .then((res)=> dispatch(receiveQuiz(res.data)));
};