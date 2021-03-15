import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchQuiz } from '../../actions/quiz_actions';
import { createScore } from '../../util/score_api_util';
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
    const username = useSelector(state => state.session.user.username);
    const flashcards = useSelector(state => state.entities.flashcards);
    const initialIds = Object.keys(flashcards);
    shuffle(initialIds); // randomize order of flashcards
    const initialFlashcardCount = {};
    initialIds.forEach(id => initialFlashcardCount[id] = 2);

   
    const [flashcardCount, setFlashcardCount] = useState({}); //record of how many more times each flashcard will show up
    const [flashcardIds, setFlashcardIds] = useState([]); //ids of flashcards to display, updated after each round
    const [curFlashcard, setCurFlashcard] = useState({}); //current flashcard to display
    
    
    //update variables in state once quiz is fetched
    useEffect(() => setFlashcardCount(initialFlashcardCount), [quiz]); 
    useEffect(() => setFlashcardIds(initialIds), [quiz]);
    useEffect(() => setCurFlashcard(flashcards[initialIds[0]]), [quiz]);

    function shuffle(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }

   
    const [numRight, setNumRight] = useState(0);
    const [numCards, setNumCards] = useState(0);
    // console.log(numRight,numCards);
    const [i, setI] = useState(0);
    function nextFlashcard(res) {
        setNumCards(prevNum => prevNum + 1);

        const id = flashcardIds[i];
        if (res === 'right') { // if user got it right, decrement # of times card will show up
            flashcardCount[id] === 1 ? delete flashcardCount[id] : flashcardCount[id]--; 
            setNumRight(prevNum => prevNum + 1);
        } else if (res === 'wrong') { //if user got it wrong, increment # of times card will show up (up to 2)
            if (flashcardCount[id] !== 2) flashcardCount[id]++;
        }
     
        if (i < flashcardIds.length-1) {
            setI(prevI => prevI+1);
            return flashcards[flashcardIds[i+1]];
        } else {
            setI(0); //start a new round of cards
            const newFlashcardIds = Object.keys(flashcardCount);
            shuffle(newFlashcardIds); // randomize order
            newFlashcardIds.sort((a,b) =>flashcardCount[b]-flashcardCount[a]); //sort desc order by flashcards to be displayed more
            setFlashcardIds(newFlashcardIds);
            return flashcards[newFlashcardIds[0]];
        }
    }
   
    const [cardClassName, flipCard] = useState('front');
    const [btnsClassName, toggleBtns] = useState('hide');

    if (!Object.keys(flashcardCount).length && numCards) {
        const percentage = (numRight/numCards * 100).toFixed(2);
        createScore({username: username, percentage: percentage, quiz:quizId});
        return (
            <div className='quiz-card-container'>
                    <h1>{quiz.topic}</h1>
                    <div className={cardClassName}> 
                        <h2>Score: {percentage+'%'}</h2> 
                    </div>
            </div>
        )
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
                    
                    <div className={`${cardClassName}-icon`}>
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
                    <div className={cardClassName}>   
                    </div>
            </div>
        )
    }
  
}

export default Quiz;