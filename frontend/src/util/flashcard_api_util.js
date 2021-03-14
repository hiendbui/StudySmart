import axios from 'axios';

export const createFlashcard = flashcard => {
    return axios.post('api/flashcards', flashcard)
};

export const deleteFlashcard = id => {
    return axios.delete(`api/flashcards/${id}`);
};

export const updateFlashcard = (flashcard,id) => {
    return axios.patch(`api/flashcards/${id}`, flashcard);
};