import React, { Component } from "react";
import { slide as Menu } from "react-burger-menu";
import { Link, Redirect } from "react-router-dom";
import Autosuggest from "react-autosuggest";
import Modal from "react-modal";
import "./SearchBar.css";
import cookbooklogo from "../../images/cookbooknamelogo.png";
import writingicon from "../../images/writingiconorange.png";
import hearticon from "../../images/hearticonorange.png";

function getSuggestionValue(suggestion) {
  return suggestion;
}

function renderSuggestion(suggestion) {
  return <span>{suggestion.identifier}</span>;
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "15%",
    height: "28%",
    textAlign: "center"
  }
};

Modal.setAppElement("#root");

class Searchbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchInput: "",
      value: "",
      suggestions: [],
      redirect: false,
      modalIsOpen: false,
      finalSuggestion: ""
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleModalClick = e => {
    console.log("close modal: this ", this);

    this.setState({
      modalIsOpen: false
    });
  };

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false, message: "", redirect: false });
  }

  onChange = (event, { newValue, method }) => {
    console.log(newValue);
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    fetch(`/users/searchbyrecipe/${value}`)
      .then(response => response.json())
      .then(data => {
        console.log("data", data);

        const dataFormatted = data.map((elem, index) => {
          if (index === 0) {
            return { title: "recipe name", info: elem };
          }
          if (index === 1) {
            return { title: "username", info: elem };
          }
          if (index === 2) {
            return { title: "full name", info: elem };
          }
        });

        const newData = dataFormatted
          .map(elem => elem.info)
          .reduce((prev, curr) => prev.concat(curr));

        this.setState({
          suggestions: newData,
          searchInput: data
        });
      });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  onSuggestionSelected = (
    event,
    { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }
  ) => {
    this.setState({
      finalSuggestion: [suggestionValue],
      redirect: true,
      value: "",
      modalIsOpen: true
    });
  };

  showSettings(event) {
    event.preventDefault();
  }

  render() {
    console.log();
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Search by recipe, username, full name",
      value,
      onChange: this.onChange,
      onKeyPress: this.onKeyPress
    };

    return (
      <div className="searchbar">
        <Link to={`/cb/feed`}>
          <img className="searchbarLogoName" src={cookbooklogo} />
          <img
            className="searchbarLogo"
            src="http://irfanyurdu.org/wp-content/uploads/2017/04/eat-flat-1.png"
          />
        </Link>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          onSuggestionSelected={this.onSuggestionSelected}
        />

        <div className="tooltip1">
          <Link to={`/cb/addrecipe`} className="searchLink">
            <img src={writingicon} className="writingIcon" />
            <span className="tooltiptext1"> Add recipe </span>
          </Link>
        </div>
        <div className="tooltip2">
          <Link
            to={`/cb/profile/${this.props.user.user_id}/favorites`}
            className="searchLink"
          >
            <img src={hearticon} className="heartIcon" />
            <span className="tooltiptext2">Favorite recipes </span>
          </Link>
        </div>
        <div>
          <Menu right className="burgerMenu">
            <a id="contact" className="menu-item" href="/cb/feed">
              Feed
            </a>
            <a id="contact" className="menu-item" href="/favorite">
              Profile
            </a>
            <a id="contact" className="menu-item" href={`/cb/profile/${this.props.user.user_id}/favorites`}>
              Favorite Recipes
            </a>
            <a id="contact" className="menu-item" href="/logout">
              Logout
            </a>
          </Menu>
        </div>

        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
        >
          <h2 ref={subtitle => (this.subtitle = subtitle)}>Search results</h2>
          <form onSubmit={this.handleLoginFormSubmit} />
          {this.state.finalSuggestion
            ? this.state.finalSuggestion.map(elem => {
                const link = elem.recipe_id
                  ? `/cb/${elem.username}/${elem.recipe_id}`
                  : `/cb/profile/${elem.user_id}`;
                return (
                  <Link
                    to={link}
                    className="searchLink"
                    onClick={this.handleModalClick}
                  >
                    <p> {elem.identifier} </p>
                  </Link>
                );
              })
            : "no results"}
          <br />
          <button onClick={this.closeModal}>close</button>
        </Modal>
      </div>
    );
  }
}

export default Searchbar;
