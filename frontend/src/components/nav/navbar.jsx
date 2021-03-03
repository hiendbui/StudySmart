import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router";
import { logout } from '../../actions/session_actions';
import { clearErrors } from '../../actions/session_actions'

const NavBar = () => {
  const loggedIn = useSelector(state => state.session.isAuthenticated);
  const dispatch = useDispatch();
  const history = useHistory();

  function handleClick(field) {
    dispatch(clearErrors());
    history.push(`./${field}`)
  }
  // Selectively render links dependent on whether the user is logged in
  function getLinks() {
      if (loggedIn) {
        return (
            <div>
                {/* <Link to={'/tweets'}>All Tweets</Link>
                <Link to={'/profile'}>Profile</Link>
                <Link to={'/new_tweet'}>Write a Tweet</Link> */}
                <button onClick={() => dispatch(logout())}>Logout</button>
            </div>
        );
      } else {
        return (
            <div>
                <button onClick={() => handleClick('signup')}>Signup</button>
                <button onClick={() => handleClick('login')}>Login</button>
            </div>
        );
      }
  }

  return (
    <div>
        <h1>StudySmart</h1>
        { getLinks() }
    </div>
  );
}

export default NavBar;