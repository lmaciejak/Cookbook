import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu'; 
import { Link } from "react-router-dom";
import './SearchBar.css'
import cookbooklogo from '../../images/cookbooknamelogo.png'
import writingicon from '../../images/writingicon.png'
import hearticon from '../../images/hearticon.png'

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
      <img className="searchbarLogoName" src={cookbooklogo} />
      <img className="searchbarLogo" src="http://irfanyurdu.org/wp-content/uploads/2017/04/eat-flat-1.png" />
      <input className="searchInput" type="search" name="search" placeholder="Search for recipes or users"/> 
      <Link to={`/addrecipe`} className="searchLink">
      <img src={writingicon} className="writingIcon"/>
      <p className="addTagline"> Add recipe </p> 
      </Link>
      <Link to={`/favorites`} className="searchLink">
      <img src={hearticon} className="heartIcon"/>
      <p className="heartTagline"> Favorite recipes </p> 
      </Link> 
      <div>
      <Menu right className="burgerMenu">
      <a id="home" className="menu-item" href="/">Home</a>
      <a id="about" className="menu-item" href="/feed">Feed</a>
      <a id="contact" className="menu-item" href="/favorite">Favorite Recipes</a>
      <a id="contact" className="menu-item" href="/contact">Recipes</a>
      <a id="contact" className="menu-item" href="/logout">Logout</a>

      </Menu> 
      </div>
      </div>
    );
  }
}

export default Searchbar;
