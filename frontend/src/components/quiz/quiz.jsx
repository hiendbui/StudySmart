import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchQuiz } from '../../actions/quiz_actions';
import { BsArrowClockwise, BsArrowCounterclockwise } from 'react-icons/bs';
import { FcCheckmark } from 'react-icons/fc';
import { AiOutlineClose } from 'react-icons/ai';
import '../main/main.scss';
import '../quiz/quiz.scss';


function Quiz() {
    const dispatch = useDispatch();
    const { quizId } = useParams();
    //fetch Quiz with flashcards
    useEffect(() => dispatch(fetchQuiz(quizId)), []);
    const quiz = useSelector(state => state.entities.quizzes[quizId]);

    const flashcards = useSelector(state => state.entities.flashcards);
    const initialIds = Object.keys(flashcards);
    shuffle(initialIds);
    const initialFlashcardCount = {};
    initialIds.forEach(id => initialFlashcardCount[id] = 2);

    // console.log(initialFlashcardCount);
    // const initialBuckets = [[...flashcardIds],[]];
    const [flashcardCount, setFlashcardCount] = useState({});
    const [flashcardIds, setFlashcardIds] = useState([]);
    const [curFlashcard, setCurFlashcard] = useState({});
    
    const [cardClassName, flipCard] = useState('front');
    const [btnsClassName, toggleBtns] = useState('hide');

    useEffect(() => setFlashcardCount(initialFlashcardCount), [quiz]);
    useEffect(() => setFlashcardIds(initialIds), [quiz]);
    useEffect(() => setCurFlashcard(flashcards[initialIds[0]]), [quiz]);
  
    function shuffle(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }

   
    const [i, setI] = useState(0);
    function nextFlashcard(res) {
        const id = flashcardIds[i];
        if (res === 'right') {
            flashcardCount[id] === 1 ? delete flashcardCount[id] : flashcardCount[id]--;
        } else if (res === 'wrong') {
            if (flashcardCount[id] !== 2) flashcardCount[id]++;
        }
     
        if (i < flashcardIds.length-1) {
            setI(i+1);  
            return flashcards[flashcardIds[i+1]];
        } else {
            setI(0);
            const newFlashcardIds = Object.keys(flashcardCount);
            shuffle(newFlashcardIds);
            newFlashcardIds.sort((a,b) =>flashcardCount[b]-flashcardCount[a]);
            setFlashcardIds(newFlashcardIds);
            return flashcards[newFlashcardIds[0]];
        }
    }
   

    
    if (curFlashcard && quiz) {
        return (
            <div className='main'>
                <div className='quiz-card-container'>
                <h1>{quiz.topic}</h1>
                    <div className={cardClassName}>
                      <h2>{curFlashcard.front}</h2>
                      <h4>{curFlashcard.back}</h4>
                    </div>
                    {/* <h1>Flip Card</h1> */}
                    <div className={`${cardClassName}-icon`}>
                        {console.log(`${cardClassName}-icon`)}
                        <BsArrowClockwise 
                            className={`flip`}
                            onClick={()=>{
                                toggleBtns('show')
                                flipCard('back')
                            }} 
                         />
                        <BsArrowCounterclockwise 
                            className={`flip`} 
                            onClick={()=>{flipCard('front')}} 
                        />
                    </div>
                    <br/>        
                    <div className={`buttons ${btnsClassName}`}>
                            <button 
                                className='x'
                                onClick={()=>{
                                    toggleBtns('hide');
                                    setCurFlashcard(nextFlashcard('wrong'));
                                    flipCard('front');
                                }}
                            >
                                <AiOutlineClose id='close'/>Didn't know it
                            </button>
                            <button 
                                className='check'
                                onClick={()=>{
                                    toggleBtns('hide');
                                    setCurFlashcard(nextFlashcard('right'));
                                    flipCard('front');
                                }}
                            >
                                Got it right! <FcCheckmark/>
                            </button>
                    </div>           
                </div>
            </div>
        )
    } else {
        return (
            
            <div className='quiz-card-container'>
            </div>
        )
    }
  
}

export default Quiz;