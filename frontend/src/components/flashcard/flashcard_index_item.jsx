import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updateFlashcard, deleteFlashcard } from '../../actions/flashcard_actions';
import { IconContext } from 'react-icons';
import { BiDotsHorizontal } from 'react-icons/bi';
import { ImPencil } from 'react-icons/im';
import { FaTrashAlt } from 'react-icons/fa';
import '../quiz/quiz.scss';
import './flashcard.scss';

function FlashcardItem({flashcard}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [dropdownClassName, toggleDropdown] = useState('hidden');
    const next = dropdownClassName === 'hidden' ? 'dropdown' : 'hidden';

    const dropdown = () => {
        return (
            <div className={dropdownClassName}>
                <button >
                    <IconContext.Provider 
                        value={{ style: { float:'left', margin:'0px 10px 0px 5px' } }}>
                        <ImPencil></ImPencil>
                    </IconContext.Provider>
                    <span>Edit Flashcard</span>
                </button>
                <button onClick={() => dispatch(deleteFlashcard(flashcard._id))}>
                    <IconContext.Provider 
                        value={{ style: { float:'left', margin:'0px 10px 0px 5px' } }}>
                        <FaTrashAlt></FaTrashAlt>
                    </IconContext.Provider>
                    <span>Delete Flashcard</span>
                </button>
            </div>
        )
    }

    return (
        <div className='flashcard' >
            <BiDotsHorizontal className='edit' onClick={()=>toggleDropdown(next)}/>
            {dropdown()}
            <h2 className='front'>{flashcard.front}</h2>
            <h4 className='back'>{flashcard.back}</h4>
        </div>
    )
};

export default FlashcardItem;