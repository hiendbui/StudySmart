import React from 'react';
import { AuthRoute, InstructorRoute } from '../util/route_util';
import { Route, Switch } from 'react-router-dom';
import NavBar from './nav/navbar';

import MainPage from './main/main_page';
import LoginForm from './session/login_form';
import SignupForm from './session/signup_form';
import QuizForm from './quiz/quiz_edit';

const App = () => (
  <div>
    <NavBar />
    <Switch>
        <Route exact path="/" component={MainPage} />
        {/* <InstructorRoute exact path="/quiz/create" component={QuizForm}/> */}
        <AuthRoute exact path="/login" component={LoginForm} />
        <AuthRoute exact path="/signup" component={SignupForm} />
    </Switch>
  </div>
);

export default App;