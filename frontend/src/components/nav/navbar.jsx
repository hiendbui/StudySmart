import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { clearErrors } from '../../actions/session_actions';
import { removeQuiz } from '../../actions/quiz_actions';
import { Link } from 'react-router-dom';
import './navbar.scss';

const NavBar = () => {
  const loggedIn = useSelector(state => state.session.isAuthenticated);
  const dispatch = useDispatch();
  
  // Selectively render links dependent on whether the user is logged in
  function getLinks() {
      if (loggedIn) {
        return (
            <div className='links'>
                <button onClick={() => dispatch(removeQuiz())}><Link to={'/'}>Home</Link></button>
                <button onClick={() => dispatch(logout())}>Logout</button>
            </div>
        );
      } else {
        return (
            <div className='links'>
                <button><Link to={'/signup'}>Signup</Link></button>
                <button><Link to={'/login'}>Login</Link></button>
            </div>
        );
      }
  }

  return (
    <div className="nav">
        <h1 onClick={() => dispatch(removeQuiz())}><Link to={'/'}>StudySmart</Link></h1>
        { getLinks() }
    </div>
  );
}

export default NavBar;