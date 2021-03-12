import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllQuizzes, createQuiz } from '../../actions/quiz_actions';
import QuizItem from '../quiz/quiz_item';
import QuizCreateForm from '../quiz/quiz_create';
import { MdAddToPhotos } from 'react-icons/md'
import './main.scss';

function MainPage() {
  const dispatch = useDispatch();

  const quizzes = useSelector(state => Object.values(state.entities.quizzes));
  if (!quizzes.length) dispatch(fetchAllQuizzes());
  const userRole = useSelector(state => state.session.user?.role);

  const [modalClassName, toggleModal] = useState('hidden')
  
  const createIcon = <MdAddToPhotos 
                        className='add-icon'
                        onClick={() => toggleModal('modal-screen')}
                      />
  return (
      <div className='main'>
        <div className='quiz-container'>
          <h1>Flashcard Quizzes</h1>
          { userRole === 'instructor' ? createIcon : null}
          <div className='quizzes'>
            {quizzes.map((quiz)=>{
              return (
                <QuizItem quiz={quiz} key={quiz._id}/>
              )
            })}
          </div>
        </div>
        {/* create quiz form */}
        <div className={modalClassName}>
          <QuizCreateForm toggleModal={toggleModal}/>
        </div>
      </div>
  );
  
}

export default MainPage;