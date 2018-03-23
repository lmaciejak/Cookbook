import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu'; 
import { Link, Redirect } from "react-router-dom";
import Autosuggest from 'react-autosuggest';
import './SearchBar.css'
import cookbooklogo from '../../images/cookbooknamelogo.png'
import writingicon from '../../images/writingicon.png'
import hearticon from '../../images/hearticon.png'

function getSuggestionValue(suggestion) {
  return suggestion.name;
}

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.name}</span>
  );
}

class Searchbar extends Component {
  constructor() {
    super();

    this.state = {
      searchInput: '',
      value: '',
      suggestions: [], 
      redirect: false, 
    }
  }

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onChange = (event, { newValue, method }) => {
    console.log(newValue)
    this.setState({
      value: newValue
    });
  };
  
  onSuggestionsFetchRequested = ({ value }) => {
    fetch(`https://swapi.co/api/people/?search=${value}`)
      .then(response => response.json())
      .then(data => this.setState({ suggestions: data.results, 
      searchInput: data}))
  }

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  onSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => { 
    this.setState({
      redirect: true
    });
  }

  showSettings (event) {
    event.preventDefault();
  }

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Search Star Wars",
      value,
      onChange: this.onChange
    };

    if(this.state.redirect) { 
      return <Redirect to='/profile' />
    }

    return (
      <div className="searchbar">
      <img className="searchbarLogoName" src={cookbooklogo} />
      <img className="searchbarLogo" src="http://irfanyurdu.org/wp-content/uploads/2017/04/eat-flat-1.png" />

      <Autosuggest 
      suggestions={suggestions}
      onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
      onSuggestionsClearRequested={this.onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
      onSuggestionSelected={this.onSuggestionSelected} />

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


// <input className="searchInput" type="search" name="searchInput" placeholder="Search for recipes or users" onChange={this.handleInput}/>