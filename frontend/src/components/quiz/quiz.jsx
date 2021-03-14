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
    const flashcardIds = Object.keys(flashcards);
    shuffle(flashcardIds);

    const initialBuckets = [[...flashcardIds],[]];
    const [buckets, updateBuckets] = useState(new Array(2).fill([]));
    const [curFlashcard, setCurFlashcard] = useState({});
    const [cardClassName, flipCard] = useState('front');
    const [btnsClassName, toggleBtns] = useState('hide');

    let i = 0;
    let j = 0;
    if (initialBuckets[0].length && !buckets[0].length) {
        updateBuckets(initialBuckets);
        setCurFlashcard(flashcards[initialBuckets[i][j]]);
    }

    function shuffle(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }

    function nextFlashcard() {
        if (j < buckets[i].length-1) {
            j++;    
        } else {
            j = 0;
            i++;
        }
        return flashcards[buckets[i][j]];
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
                                    setCurFlashcard(nextFlashcard());
                                    flipCard('front');
                                }}
                            >
                                <AiOutlineClose id='close'/>Didn't know it
                            </button>
                            <button 
                                className='check'
                                onClick={()=>{
                                    toggleBtns('hide');
                                    setCurFlashcard(nextFlashcard());
                                    flipCard('front');
                                }}
                            >
                                Got it right! <FcCheckmark/>
                            </button>
                    </div>           
                </div>
            </div>
        )
    } else return null;
  
}

export default Quiz;