import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllQuizzes } from '../../actions/quiz_actions';
import QuizItem from '../quiz/quiz_item';
import QuizCreateForm from '../quiz/quiz_create';
import { MdAddToPhotos } from 'react-icons/md'
import './main.scss';

function MainPage() {
  const dispatch = useDispatch();

  const quizzes = useSelector(state => Object.values(state.entities.quizzes));
  if (!quizzes.length) dispatch(fetchAllQuizzes());
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
          <QuizCreateForm toggleModal={toggleModal}/>
        </div>
      </div>
  );
  
}

export default MainPage;