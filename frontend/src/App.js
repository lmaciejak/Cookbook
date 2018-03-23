import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';

import Cookbook from './components/Cookbook'
import Home from './components/Home/Home'

import logo from './logo.svg';
import './App.css';
import Feed from './components/Feed/Feed';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/cb' component={Cookbook} />
        </Switch>
      </div>
    );
  }
}

export default App;
