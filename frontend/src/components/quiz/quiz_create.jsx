import React, { useState } from 'react';
import { createQuiz } from '../../actions/quiz_actions';
import { useDispatch } from 'react-redux';

function QuizCreateForm() {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        topic: '',
        description: ''
    });

    function update(field) {
        return e => setFormData({...formData, [field]: e.target.value})
    }

    return (
      <div className="create-form">
        <h1>Create Quiz</h1>
        <form onSubmit={() => dispatch(createQuiz(formData))}>
          <br/>
          <br/>
          <div>
              <input type="text"
                value={formData.topic}
                onChange={update('topic')}
                placeholder="Topic"
              />
            <br/>
              <textarea type="text"
                value={formData.description}
                onChange={update('description')}
                placeholder="Description"
              />
            <br/>
            <input className= "submit" type="submit" value="Submit" />
          </div>
        </form>
      </div>
    );
};

export default QuizCreateForm;