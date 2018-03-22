import React, { Component } from 'react';
import {Route, Link, Switch} from 'react-router-dom';

import Cookbook from './components/Home/Home'


import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
            <Route exact path='/' component={Cookbook} />
        </Switch>
      </div>
    );
  }
}

export default App;
