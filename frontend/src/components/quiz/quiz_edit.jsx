import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchQuiz } from '../../actions/quiz_actions';


function QuizEditForm() {
    const dispatch = useDispatch();
    const { quizId } = useParams();
    //fetch Quiz with flashcards
    useEffect(() => dispatch(fetchQuiz(quizId)), []);
    
    const flashcards = useSelector(state => Object.values(state.entities.flashcards));
  
    return (
        <h1>{quizId}</h1>
    )
  
//   return (
//       <div className='main'>
//         <div className='quiz-container'>
//           <h1>Flashcard Quizzes</h1>
//           { userRole === 'instructor' ? <MdAddToPhotos className='add-icon'/> : null}
//           <div className='quizzes'>
//             {quizzes.map((quiz)=>{
//               return (
//                 <QuizItem quiz={quiz} key={quiz._id}/>
//               )
//             })}
//           </div>
//         </div>
//       </div>
//   );
  
}

export default QuizEditForm;