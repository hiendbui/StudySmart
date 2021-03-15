import axios from 'axios';

export const createScore = score => {
    return axios.post('api/scores', score)
};

export const fetchScores = quizId => {
    return axios.get(`api/scores/quiz/${quizId}`)
}