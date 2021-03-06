import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../actions/session_actions';
import './session_form.scss';

function LoginForm() {
  const errors = useSelector(state => state.errors.session);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  // Handle field updates (called in the render method)
  function update(field) {
    return e => setFormData({...formData, [field]: e.target.value})
  }

  // Handle form submission
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(login(formData));
  }

  // Render the session errors if there are any
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
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <br/>
          <br/>
          <div>
              <input type="text"
                value={formData.username}
                onChange={update('username')}
                placeholder="Username"
              />
            <br/>
              <input type="password"
                value={formData.password}
                onChange={update('password')}
                placeholder="Password"
              />
            <br/>
            <input className= "submit" type="submit" value="Submit" />
            {renderErrors()}
          </div>
        </form>
      </div>
    );
  
}

export default LoginForm;