import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signup } from '../../actions/session_actions';

function SignupForm() {
  const errors = useSelector(state => state.errors.session);
  const dispatch = useDispatch();


  const [formData, setFormData] = useState({
    username: '',
    type: '',
    password: '',
    password2: '',
  });
  
  const {username, type, password, password2} = formData;


  function update(field) {
    return e => setFormData({...formData, [field]: e.target.value})
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(signup(formData));
  }

  function renderErrors() {
    return(
      <ul>
        {Object.keys(errors).map((error, i) => (
          <li key={`error-${i}`}>
            {errors[error]}
          </li>
        ))}
      </ul>
    );
  }

  
  return (
    <div className="signup-form-container">
      <form onSubmit={handleSubmit}>
        <div className="signup-form">
          <br/>
            <input type="text"
              value={username}
              onChange={update('username')}
              placeholder="Username"
            />
          <br/>
            <input type="text"
              value={type}
              onChange={update('type')}
              placeholder="Type"
            />
          <br/>
            <input type="password"
              value={password}
              onChange={update('password')}
              placeholder="Password"
            />
          <br/>
            <input type="password"
              value={password2}
              onChange={update('password2')}
              placeholder="Confirm Password"
            />
          <br/>
          <input type="submit" value="Submit" />
          {renderErrors()}
        </div>
      </form>
    </div>
  );
}

export default SignupForm;