import React, { useState } from 'react';
import { createFlashcard, updateFlashcard } from '../../actions/flashcard_actions';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai'
import '../quiz/quiz.scss';

function FlashcardForm({toggleModal, formType, flashcard}) {
    const dispatch = useDispatch();
    const { quizId } = useParams(); // get quiz id to attach to formData

    const initialFormData = flashcard ? flashcard : {quiz:quizId,front: '', back: ''}
    
    const [formData, setFormData] = useState(initialFormData);

    function update(field) {
        return e => setFormData({...formData, [field]: e.target.value})
    }

    //set action type depending on formType
    const action = formType === 'Create' ? createFlashcard : updateFlashcard;
    function handleSubmit(e){
        e.preventDefault();
        toggleModal('hidden');
        dispatch(action(formData, flashcard?._id)); //passing id for updateFlashcard
    }

    return (
      <div className="create-form">
        <h1>{formType} Flashcard</h1>
        <AiOutlineClose className='icon close' onClick={() => toggleModal('hidden')}/>
        <form onSubmit={handleSubmit}>
          <br/>
          <br/>
          <div className={formType === 'Edit' ? 'edit-input' :''}>
              <input type="text"
                value={formData.front}
                onChange={update('front')}
                placeholder="Front"
                required
              />
            <br/>
              <textarea type="text"
                value={formData.back}
                onChange={update('back')}
                placeholder="Back"
                required
              />
            <br/>
            <input className= "submit" type="submit" value="Submit" />
          </div>
        </form>
      </div>
    );
};

export default FlashcardForm;