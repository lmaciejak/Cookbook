import React, { Component } from 'react';
import '../../App.css'

class Searchbar extends Component {
  constructor() {
    super();

    this.state = {
      input: ''
    }
  }

  render() {
    return (
      <div className="searchbar">
      <h3 className="searchbarLogo"> Cookbook + logo </h3> 
      <input className="searchinput" type="search" name="search" placeholder="Search the site..."/> 
      <button> Add new recipe </button> 
      </div>
    );
  }
}

export default Searchbar;