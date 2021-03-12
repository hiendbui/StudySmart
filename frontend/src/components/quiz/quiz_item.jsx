import React from 'react';
import './quiz.scss';

function QuizItem({quiz}) {
    
    return (
        <div className='quiz' >
            <h2>{quiz.topic}</h2>
            <h3>{quiz.description}</h3>
        </div>
    )
};

export default QuizItem;