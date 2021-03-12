import React, { useState } from 'react';
import { createQuiz } from '../../actions/quiz_actions';
import { useDispatch } from 'react-redux';
import { AiOutlineClose } from 'react-icons/ai'

function QuizCreateForm({toggleModal}) {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        topic: '',
        description: ''
    });

    function update(field) {
        return e => setFormData({...formData, [field]: e.target.value})
    }

    function handleSubmit(e){
        e.preventDefault();
        toggleModal('hidden');
        dispatch(createQuiz(formData));
    }

    return (
      <div className="create-form">
        <h1>Create Quiz</h1>
        <AiOutlineClose className='icon close' onClick={() => toggleModal('hidden')}/>
        <form onSubmit={handleSubmit}>
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

export default QuizCreateForm;