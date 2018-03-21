import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu'; 
import './SearchBar.css'

class Searchbar extends Component {
  constructor() {
    super();

    this.state = {
      input: ''
    }
  }

  showSettings (event) {
    event.preventDefault();
  }

  render() {
    return (
      <div className="searchbar">
      <h3 className="searchbarLogo"> Cookbook + logo </h3> 
      <input className="searchinput" type="search" name="search" placeholder="Search the site..."/> 
      <button className="addRecipeButton"> Add new recipe </button> 
      <div>
      <Menu right className="burgerMenu">
      <a id="home" className="menu-item" href="/">Home</a>
      <a id="about" className="menu-item" href="/about">My Profile</a>
      <a id="contact" className="menu-item" href="/contact">Favorites</a>
      <a id="contact" className="menu-item" href="/contact">Recipes</a>
      <a id="contact" className="menu-item" href="/contact">Logout</a>

      </Menu> 
      </div>
      </div>
    );
  }
}

export default Searchbar;
