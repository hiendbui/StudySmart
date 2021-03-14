import * as APIUtil from '../util/flashcard_api_util';

export const RECEIVE_FLASHCARD = "RECEIVE_FLASHCARD";
export const REMOVE_FLASHCARD = "REMOVE_FLASHCARD";

const receiveFlashcard = flashcard => ({
    type: RECEIVE_FLASHCARD,
    flashcard
});

const removeFlashcard = flashcardId => ({
    type: REMOVE_FLASHCARD,
    flashcardId
});

export const createFlashcard = flashcard => dispatch => (
    APIUtil.createFlashcard(flashcard)
        .then(res => dispatch(receiveFlashcard(res.data)))
);

export const deleteFlashcard = id => dispatch => {
    APIUtil.deleteFlashcard(id)
        .then(() => dispatch(removeFlashcard(id)));
};

export const updateFlashcard = (flashcard,id) => dispatch => {
     APIUtil.updateFlashcard(flashcard, id)
        .then((res)=> dispatch(receiveFlashcard(res.data)));
};