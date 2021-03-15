import React, { useState, useRef } from 'react';
import { createQuiz, updateQuiz } from '../../actions/quiz_actions';
import { useDispatch } from 'react-redux';
import { AiOutlineClose } from 'react-icons/ai'

function QuizForm({toggleModal, formType, quiz}) {
    const dispatch = useDispatch();

    const initialFormData = quiz ? quiz : {topic: '', description: ''}
    
    const [formData, setFormData] = useState(initialFormData);

    function update(field) {
        return e => setFormData({...formData, [field]: e.target.value})
    }

    //set action type depending on formType
    const action = formType === 'Create' ? createQuiz : updateQuiz;
    
    function handleSubmit(e){
        e.preventDefault();
        // document.getElementById('form').reset();
        toggleModal('hidden');
        dispatch(action(formData, quiz?._id)); //passing id for updateQuiz
        if (formType === 'Create') setFormData(initialFormData); //reset formData if form is for creating quiz
    }

    return (
      <div className="create-form">
        <h1>{formType} Quiz</h1>
        <AiOutlineClose 
          className='icon close' 
          onClick={
            () => {toggleModal('hidden');setFormData(initialFormData)} //close modal and reset formdata
          }/>
        <form onSubmit={handleSubmit} id='form'>
          <br/>
          <br/>
          <div>
              <input type="text"
                value={formData.topic}
                onChange={update('topic')}
                placeholder="Topic"
                required
              />
            <br/>
              <textarea type="text"
                value={formData.description}
                onChange={update('description')}
                placeholder="Description"
                required
              />
            <br/>
            <input className= "submit" type="submit" value="Submit" />
          </div>
        </form>
      </div>
    );
};

export default QuizForm;