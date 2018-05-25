import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import StartPage from './StartPage';
import NotFound from './NotFound';
import App from '../App';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={StartPage} />
      <Route exact path='/note/:noteID' component={App} />
      <Route exact component={NotFound} />
    </Switch>
  </BrowserRouter>
)

export default Router;