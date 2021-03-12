import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

// Passed in from parent component or from mapStateToProps
const Auth = ({ component: Component, path, loggedIn, exact }) => (
  <Route path={path} exact={exact} render={(props) => (
    !loggedIn ? (
      <Component {...props} />
    ) : (
        // Redirect to the home page if the user is authenticated
      <Redirect to="/" />
    )
  )} />
);

const Instructor = ({ component: Component, loggedIn, isInstructor, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      loggedIn && isInstructor ? (
        <Component {...props} />
      ) : (
        // Redirect to the main page if the user is not logged in or is a student
        <Redirect to="/" />
      )
    }
  />
);

// Use the isAuthenitcated slice of state to determine whether a user is logged in

const mapStateToProps = state => ({
    loggedIn: state.session.isAuthenticated,
    isInstructor: state.session.user?.role
});

export const AuthRoute = withRouter(connect(mapStateToProps)(Auth));

export const InstructorRoute = withRouter(connect(mapStateToProps)(Instructor));