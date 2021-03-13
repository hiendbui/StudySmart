import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllQuizzes, removeQuiz } from '../../actions/quiz_actions';
import QuizItem from '../quiz/quiz_index_item';
import QuizForm from '../quiz/quiz_form';
import { MdAddToPhotos } from 'react-icons/md'
import './main.scss';

function MainPage() {
  const dispatch = useDispatch();

  const quizzes = useSelector(state => Object.values(state.entities.quizzes));
  
  useEffect(()=>dispatch(removeQuiz()),[]); //empty flashcards in state
  useEffect(()=>dispatch(fetchAllQuizzes()),[]);// fetch all quizzes on initial load
  //checks if current user is an instructor
  const isInstructor = useSelector(state => state.session.user?.role) === 'instructor';

  const [modalClassName, toggleModal] = useState('hidden')
  
  const createIcon = <MdAddToPhotos className='icon'
                        onClick={() => toggleModal('modal-screen')}
                      />
  return (
      <div className='main'>
        <div className='quiz-container'>
          <h1>Flashcard Quizzes</h1>
          { isInstructor ? createIcon : null}
          <div className='quizzes'>
            {quizzes.map((quiz)=>{
              return (
                <QuizItem 
                  key={quiz._id} 
                  quiz={quiz} 
                  isInstructor={isInstructor}
                />
              )
            })}
          </div>
        </div>
        {/* create quiz form */}
        <div className={modalClassName}>
          {/* Specify form is for creating quiz */}
          <QuizForm toggleModal={toggleModal} formType={'Create'}/>
        </div>
      </div>
  );
  
}

export default MainPage;