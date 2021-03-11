import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllQuizzes } from '../../actions/quiz_actions';

function MainPage() {
  const dispatch = useDispatch();

  
  
  const quizzes = useSelector(state => Object.values(state.entities.quizzes));
  if (!quizzes.length) dispatch(fetchAllQuizzes());
  
  return (
      <div>
        <ul>
          {quizzes.map((quiz)=>{
            return (
              <li>{quiz.topic}</li>
            )
          })}
        </ul>
        <footer>
          Created by Hien Bui &copy; 2021
        </footer>
      </div>
  );
  
}

export default MainPage;