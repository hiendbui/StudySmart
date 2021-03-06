import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signup } from '../../actions/session_actions';
import './session_form.scss';

function SignupForm() {
  const errors = useSelector(state => state.errors.session);
  const dispatch = useDispatch();


  const [formData, setFormData] = useState({
    username: '',
    role: '',
    password: '',
    password2: '',
  });
  
  const {username, role, password, password2} = formData;


  function update(field) {
    return e => setFormData({...formData, [field]: e.target.value})
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(signup(formData));
  }

  function renderErrors() {
    return(
      <ul className="errors">
        {Object.keys(errors).map((error, i) => (
          <li key={`error-${i}`}>
            {errors[error]}
          </li>
        ))}
      </ul>
    );
  }

  
  return (
    <div className="session-form">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className="signup-form">
          <br/>
            <div className="radio">
              <input type="radio"  name='role' value="student" onChange={update('role')}/>
              <label>Student</label>
              <input type="radio" name='role' value="instructor" onChange={update('role')}/>
              <label>Instructor</label>
            </div>
          <br/>
            <input type="text"
              value={username}
              onChange={update('username')}
              placeholder="Username"
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
          <input className= "submit" type="submit" value="Submit" />
          {renderErrors()}
        </div>
      </form>
    </div>
  );
}

export default SignupForm;