import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchQuiz } from '../../actions/quiz_actions';
import '../main/main.scss';
import '../quiz/quiz.scss';


function Quiz() {
    const dispatch = useDispatch();
    const { quizId } = useParams();
    //fetch Quiz with flashcards
    useEffect(() => dispatch(fetchQuiz(quizId)), []);
    const quiz = useSelector(state => state.entities.quizzes[quizId]);

    const flashcards = useSelector(state => state.entities.flashcards);
    const flashcardIds = Object.keys(flashcards);
    const [buckets, updateBuckets] = useState([
        new Set(flashcardIds), 
        new Set(),
        new Set()
    ]);

    if (quiz) {
        return (
            <div className='main'>
                <div className='quiz-card-container'>
                <h1>{quiz.topic}</h1>
                
                <div className='flashcard-quiz'>
                  
                </div>
                </div>
            </div>
        )
    } else return null;
  
}

export default Quiz;