import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';

import Main from './pages/Main';
import Repository from './pages/Repository';

import history from './services/history';

export default function createRoute() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/repository/:repository" component={Repository} />
      </Switch>
    </Router>
  );
}
