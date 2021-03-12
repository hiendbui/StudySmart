import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllQuizzes } from '../../actions/quiz_actions';
import QuizItem from './quiz_item';
import { MdAddToPhotos } from 'react-icons/md'
import './main.scss';

function MainPage() {
  const dispatch = useDispatch();

  const quizzes = useSelector(state => Object.values(state.entities.quizzes));
  if (!quizzes.length) dispatch(fetchAllQuizzes());
  
  return (
      <div className='main'>
        <div className='quiz-container'>
          <h1>Flashcard Quizzes</h1>
          <MdAddToPhotos className='add-icon'/>
          <div className='quizzes'>
            {quizzes.map((quiz)=>{
              return (
                <QuizItem quiz={quiz}/>
              )
            })}
          </div>
        </div>
      </div>
  );
  
}

export default MainPage;