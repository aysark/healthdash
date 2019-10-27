import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router'

import App from './App';
import User from './User';
import './index.css';
import './semantic-ui/semantic.min.css';

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App} />
    <Route path="/user" component={User} />
  </Router>
), document.getElementById('root'))
