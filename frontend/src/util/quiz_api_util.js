import axios from 'axios';

export const fetchQuizzes = () => {
    return axios.get('api/quizzes')
};

export const fetchQuiz = id => {
    return axios.get(`api/quizzes/${id}`)
};

export const createQuiz = quiz => {
    return axios.post('api/quizzes', quiz)
};

export const deleteQuiz = id => {
    return axios.delete(`api/quizzes/${id}`);
};

export const updateQuiz = (id, quiz) => {
    return axios.patch(`api/quizzes/${id}`, quiz);
};