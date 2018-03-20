import React, { Component } from 'react';
import {Route, Link, Switch} from 'react-router-dom';
import Home from './components/Home/Home'

import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
        <Route exact path='/' component={Home} />
        </Switch>
      </div>
    );
  }
}

export default App;
