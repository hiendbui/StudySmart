import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchQuiz } from '../../actions/quiz_actions';


// function MainPage() {
//   const dispatch = useDispatch();

//   const quizzes = useSelector(state => Object.values(state.entities.quizzes));
//   if (!quizzes.length) dispatch(fetchAllQuizzes());
  
//   const userRole = useSelector(state => state.session.user?.role);
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
  
// }

// export default QuizForm;