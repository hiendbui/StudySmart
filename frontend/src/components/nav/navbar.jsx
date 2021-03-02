import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/session_actions';


const NavBar = () => {
  // constructor(props) {
  //   super(props);
  //   this.logoutUser = this.logoutUser.bind(this);
  //   this.getLinks = this.getLinks.bind(this);
  // }
  const loggedIn = useSelector(state => state.session.isAuthenticated);
  const dispatch = useDispatch();

  function logoutUser(e) {
      e.preventDefault();
      dispatch(logout());
  }

  // Selectively render links dependent on whether the user is logged in
  function getLinks() {
      if (loggedIn) {
        return (
            <div>
                {/* <Link to={'/tweets'}>All Tweets</Link>
                <Link to={'/profile'}>Profile</Link>
                <Link to={'/new_tweet'}>Write a Tweet</Link> */}
                <button onClick={logoutUser}>Logout</button>
            </div>
        );
      } else {
        return (
            <div>
                <Link to={'/signup'}>Signup</Link>
                <Link to={'/login'}>Login</Link>
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