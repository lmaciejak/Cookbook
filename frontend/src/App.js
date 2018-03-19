import React, { Component } from 'react';
import {Route, Link, Switch} from 'react-router-dom';
import Cookbook from './components/Cookbook'

import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Cookbook />
      </div>
    );
  }
}

export default App;
