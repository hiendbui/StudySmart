import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchScores } from '../../actions/score_actions';
import { fetchQuiz } from '../../actions/quiz_actions';
import '../main/main.scss';
import './scores.scss';


function Scores() {
    const dispatch = useDispatch();
    const { quizId } = useParams();
    //fetch Quiz with flashcards
    useEffect(() => dispatch(fetchQuiz(quizId)), []);
    const quizTopic = useSelector(state => state.entities.quizzes[quizId]?.topic);

    useEffect(() => dispatch(fetchScores(quizId)), []);
    const scores = useSelector(state => Object.values(state.entities.scores));
    scores.sort((a,b)=>(b.percentage-a.percentage));
    
    let i = 0;
    if (quizTopic) {
        return (
      <div className='main'>
        <div className='quiz-container'>
          <h1>Scores for {quizTopic}</h1>
          <br/>
          <div className='scores'>
            {scores.map((score)=>{
                i++
              return (
                <div className='score'>
                    <h2 key={i}>{i}. {score.username}: {score.percentage}%</h2>
                </div>
              )
            })}
          </div>
        </div>
      </div>
        )
    } return null;
    
  
}

export default Scores;