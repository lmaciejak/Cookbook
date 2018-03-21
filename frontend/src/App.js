import React, { Component } from 'react';
import {Route, Link, Switch} from 'react-router-dom';

import Cookbook from './components/Cookbook'


import logo from './logo.svg';
import './App.css';
import Feed from './components/Feed/Feed';

class App extends Component {
  render() {
    return (
      <div>
      <Cookbook />
      </div>
    );
  }
}

export default App;
