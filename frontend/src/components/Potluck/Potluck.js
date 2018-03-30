import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { Redirect } from "react-router-dom";
import "./Potluck.css";
import Searchbar from "../Search/SearchBar";

class Potluck extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "",
      potluck_info: [],
      potluck_invitations: [],
      potluck_items: [], 
      suggestedItem: ''
    };
  }

  componentDidMount(props) {
    axios
      .get(`/users/getsinglepotluck/${this.props.potluckID['potluckID']}`)
      .then(res => {
        this.setState({
          potluck_info: res.data[0][0],
          potluck_invitations: res.data[1],
          potluck_items: res.data[2]
        });
      })
      .catch(err => {
        this.setState({
          message: `${err.response.data}`
        });
      });
  }

  addNewItemToList = e => {
    axios.post(`/addPotluckItem`, {
      potluck_id: this.props.potluckID['potluckID'],
      item_name: this.state.suggestedItem
    });
  };

  handleFormInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  itemSignUpClick = e => {
    axios.post("/users/addUserToItem");
  };

  render(props) {
    console.log('props.match.params', this.props.potluckID['potluckID'])
    console.log("props user", this.props.user);
    console.log("potluck info", this.state.potluck_invitations);
    const { potluck_info, potluck_items } = this.state;
    console.log(this.props.user);
    return (
      <div className="Potluckpage">
        <Searchbar user={this.props.user} />
        <div className="PotluckContainer">
          <h2> Potluck Name: {potluck_info.potluck_name} </h2>
          <h2> Potluck Date: {potluck_info.potluck_date} </h2>
          <h2> Potluck Time: {potluck_info.potluck_time} </h2>
          <h2> Potluck Location: {potluck_info.potluck_location} </h2>
          <h2> Organizer: {potluck_info.username} </h2>
          <div className="PotluckDishes">
            <h2> Invitees </h2>
            <h2> Things to bring </h2>
            {potluck_items
              ? potluck_items.map(elem => (
                  <li>
                    {" "}
                    {elem.item_name}{" "}
                    {elem.user_id ? (
                      elem.username
                    ) : (
                      <button onClick={this.itemSignUpClick}>
                        {" "}
                        Sign me up for this{" "}
                      </button>
                    )}
                    {elem.user_id === this.props.user.user_id ? (
                      <button onClick={this.itemSignUpClick}>
                        {" "}
                        Remove my signup{" "}
                      </button>
                    ) : (
                      ""
                    )}
                  </li>
                ))
              : ""}
            <input type="text" placeholder="suggested item name here" name="suggestedItem" onChange={this.handleFormInput} /> 
            <button onClick={this.addNewItemToList}> Add new item </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Potluck;
