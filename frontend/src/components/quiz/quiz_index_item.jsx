import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteQuiz } from '../../actions/quiz_actions';
import { IconContext } from 'react-icons';
import { BiDotsHorizontal } from 'react-icons/bi';
import { ImPencil } from 'react-icons/im';
import { FaTrashAlt, FaListOl } from 'react-icons/fa';
import './quiz.scss';

function QuizItem({quiz, isInstructor}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [dropdownClassName, toggleDropdown] = useState('hidden');
    const next = dropdownClassName === 'hidden' ? 'dropdown' : 'hidden';

    const icon = isInstructor ? <BiDotsHorizontal className='edit' onClick={()=>toggleDropdown(next)}/> : <br/>
    const dropdown = () => {
        return (
            <div className={dropdownClassName}>
                <button onClick={() => history.push(`/scores/quiz/${quiz._id}`)}>
                    <IconContext.Provider 
                        value={{ style: { float:'left', margin:'0px 10px 0px 5px' } }}>
                        <FaListOl></FaListOl>
                    </IconContext.Provider>
                    <span>View Scores</span>
                </button>
                <button onClick={() => history.push(`/quiz/edit/${quiz._id}`)}>
                    <IconContext.Provider 
                        value={{ style: { float:'left', margin:'0px 10px 0px 5px' } }}>
                        <ImPencil></ImPencil>
                    </IconContext.Provider>
                    <span>Edit Quiz</span>
                </button>
                <button onClick={() => dispatch(deleteQuiz(quiz._id))}>
                    <IconContext.Provider 
                        value={{ style: { float:'left', margin:'0px 10px 0px 5px' } }}>
                        <FaTrashAlt></FaTrashAlt>
                    </IconContext.Provider>
                    <span>Delete Quiz</span>
                </button>
            </div>
        )
    }

    return (
        <div className='quiz' >
            {icon}
            {dropdown()}
            <h2 className='front'>{quiz.topic}</h2>
            <h4 className='back' onClick={() => history.push(`/quiz/${quiz._id}`)}>{quiz.description}</h4>
        </div>
    )
};

export default QuizItem;

