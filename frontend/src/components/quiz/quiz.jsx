import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchQuiz } from '../../actions/quiz_actions';
import { MdAddBox } from 'react-icons/md'
import { BsPencilSquare } from 'react-icons/bs'
import QuizForm from './quiz_form';
import '../main/main.scss';
import '../quiz/quiz.scss';


function QuizEditForm() {
    const dispatch = useDispatch();
    const { quizId } = useParams();
    //fetch Quiz with flashcards
    useEffect(() => dispatch(fetchQuiz(quizId)), []);
    const quiz = useSelector(state => state.entities.quizzes[quizId]);
    const flashcards = useSelector(state => Object.values(state.entities.flashcards));
    const [editQuizModal, toggleQuizModal] = useState('hidden');
    const [createModal, toggleCreateModal] = useState('hidden');
    const [editModal, toggleEditModal] = useState('hidden');

    const editQuizIcon = <BsPencilSquare className='edit-icon' onClick={()=>toggleQuizModal('modal-screen')}/>

    if (quiz) {
        return (
            <div className='main'>
                <div className='quiz-container'>
                <h1>Flashcards for {quiz.topic} Quiz  {editQuizIcon}</h1>
                
                <MdAddBox className='icon' onClick={()=>toggleCreateModal('modal-screen')}/>
                <div className='flashcards'>
                  {flashcards.map((flashcard)=>{
                    return (
                    //   <QuizItem quiz={quiz} key={quiz._id}/>
                        <h1>flashcard</h1>
                    )
                  })}
                </div>
                </div>

                <div className={editQuizModal}>
                    {/* Specify form is for editing quiz and pass in quiz */}
                    <QuizForm 
                        toggleModal={toggleQuizModal} 
                        formType={'Edit'} 
                        quiz={quiz}
                    />
                </div>
            </div>
        )
    } else return null;
  
}

export default QuizEditForm;