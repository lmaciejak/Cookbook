import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Select from "react-select";
import "react-select/dist/react-select.css";

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
      suggestedItem: "",
      following: [],
      selectedValues: "",
      selectedRsvpValue: ""
    };
  }

  componentDidMount(props) {
    axios
      .get(`/users/getsinglepotluck/${this.props.potluckID["potluckID"]}`)
      .then(res => {
        this.setState({
          potluck_info: res.data[0][0],
          potluck_invitations: res.data[1],
          potluck_items: res.data[2]
        });
      })
      .then(() => {
        axios
          .get(
            `/users/getNewInviteesPotluck/${
              this.props.potluckID["potluckID"]
            }/${this.state.potluck_info.organizer_id}`
          )
          .then(res => {
            console.log("res", res);
            this.setState({
              following: res.data
            });
          });
      })
      .catch(err => {
        this.setState({
          message: `${err.response.data}`
        });
      });
  }

  addNewItemToList = e => {
    axios
      .post(`/users/addPotluckItem`, {
        potluck_id: this.props.potluckID["potluckID"],
        item_name: this.state.suggestedItem
      })
      .then(() =>
        axios
          .get(`/users/getsinglepotluck/${this.props.potluckID["potluckID"]}`)
          .then(res => {
            this.setState({
              potluck_items: res.data[2],
              suggestedItem: ""
            });
          })
          .catch(err => {
            this.setState({
              message: `${err.response.data}`
            });
          })
      );
  };

  handleFormInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  itemSignUpClick = e => {
    axios
      .post("/users/addUserToItem", {
        item_id: e.target.id
      })
      .then(() =>
        axios
          .get(`/users/getsinglepotluck/${this.props.potluckID["potluckID"]}`)
          .then(res => {
            this.setState({
              potluck_items: res.data[2],
              suggestedItem: ""
            });
          })
          .catch(err => {
            this.setState({
              message: `${err.response.data}`
            });
          })
      );
  };

  itemRemoveSignUpClick = e => {
    axios
      .post("/users/removeUserFromItem", {
        item_id: e.target.id
      })
      .then(() =>
        axios
          .get(`/users/getsinglepotluck/${this.props.potluckID["potluckID"]}`)
          .then(res => {
            this.setState({
              potluck_items: res.data[2],
              suggestedItem: ""
            });
          })
          .catch(err => {
            this.setState({
              message: `${err.response.data}`
            });
          })
      );
  };

  handleInvitationSelect = value => {
    const { selectedValues } = this.state;
    this.setState({
      selectedValues: value
    });
  };

  handleRsvpSelect = e => {
    console.log('e.target%%%', e.target)
    const { selectedRsvpValue } = this.state;
    this.setState({
      selectedRsvpValue: e.target.value
    });
    axios
      .post(`/users/changePotluckRSVP/${this.props.potluckID["potluckID"]}`, {
        invitee_rsvp: e.target.value,
        user_id: e.target.id
      })
      .then(() =>{
      axios
        .get(`/users/getsinglepotluck/${this.props.potluckID["potluckID"]}`)
        .then(res => {
          console.log('res!!!!!!!!!!', res)
          this.setState({
            potluck_invitations: res.data[1],
          });
        })})
      .catch(err => {
        this.setState({
          message: `${err.response.data}`
        });
      })
  };

  submitInvite = e => {
    console.log("HELLOOOOOOOO");
    console.log("selected", this.state.selectedValues);
    axios
      .post(`/users/addInviteeToPotluck/${this.props.potluckID["potluckID"]}`, {
        invitees: this.state.selectedValues
      })
      .then(() => {
        axios
          .get(
            `/users/getNewInviteesPotluck/${
              this.props.potluckID["potluckID"]
            }/${this.state.potluck_info.organizer_id}`
          )
          .then(res => {
            console.log("res", res);
            this.setState({
              following: res.data,
              selectedValues: ""
            });
          });
      })
      .then(() => {
        axios
          .get(`/users/getsinglepotluck/${this.props.potluckID["potluckID"]}`)
          .then(res => {
            this.setState({
              potluck_invitations: res.data[1]
            });
          });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render(props) {
    console.log("selectedValues", this.state.selectedValues);
    const { potluck_info, potluck_items, potluck_invitations } = this.state;
    const stateOptions = this.state.following.map(elem => ({
      value: elem.user_id,
      label: elem.username
    }));
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
            <table>
              <tbody>
                <tr>
                  <th> Invitee </th>
                  <th> RSVP </th>
                </tr>

                {potluck_invitations
                  ? potluck_invitations.map(elem => (
                      <tr>
                        {" "}
                        <td key={Math.random()}> {elem.username} </td>{" "}
                        <td key={Math.random()}>
                          {elem.invitee_rsvp
                            ? elem.invitee_rsvp
                            : "no response"}{" "}
                          {elem.user_id === this.props.user.user_id ? (
                            <select
                              onChange={this.handleRsvpSelect}
                              value={this.state.selectedRsvpValue}
                              id={elem.user_id}
                            >
                              <option> Change RSVP </option>
                              <option value="yes"> yes </option>
                              <option value="maybe"> maybe </option>
                              <option value="no"> no </option>
                            </select>
                          ) : (
                            ""
                          )}
                        </td>
                      </tr>
                    ))
                  : ""}
              </tbody>
            </table>
            <p> Invite friends </p>

            <Select
              name="form-field-name"
              multi
              value={this.state.selectedValues}
              onChange={this.handleInvitationSelect}
              options={stateOptions}
            />

            <button onClick={this.submitInvite}> Submit </button>
            <h2> Things to bring </h2>
            <table>
              <tbody>
                <tr>
                  <th> Dish/thing to bring </th>
                  <th> Person Bringing </th>
                </tr>
                {potluck_items
                  ? potluck_items.map(elem => (
                      <tr>
                        <td key={Math.random()}> {elem.item_name} </td>
                        <td key={Math.random()}>
                          {elem.user_id ? (
                            elem.username
                          ) : (
                            <button
                              onClick={this.itemSignUpClick}
                              id={elem.item_id}
                            >
                              {" "}
                              Sign me up for this{" "}
                            </button>
                          )}
                          {elem.user_id === this.props.user.user_id ? (
                            <button
                              onClick={this.itemRemoveSignUpClick}
                              id={elem.item_id}
                            >
                              {" "}
                              Remove my signup{" "}
                            </button>
                          ) : (
                            ""
                          )}
                        </td>
                      </tr>
                    ))
                  : ""}
              </tbody>
            </table>
            <input
              type="text"
              placeholder="suggested item name here"
              name="suggestedItem"
              value={this.state.suggestedItem}
              onChange={this.handleFormInput}
            />
            <button onClick={this.addNewItemToList}> Add new item </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Potluck;
