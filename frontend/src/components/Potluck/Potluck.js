import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Select from "react-select";
import "react-select/dist/react-select.css";

import "./Potluck.css";
import Searchbar from "../Search/SearchBar";
import PotluckModal from "./PotluckModal";

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
      selectedRsvpValue: "",
      allInvitees: "",
      seenPotluck: false
    };
  }

  componentDidMount(props) {
    axios
      .get(`/users/getsinglepotluck/${this.props.potluckID["potluckID"]}`)
      .then(res => {
        this.setState({
          potluck_info: res.data[0][0],
          potluck_invitations: res.data[1],
          potluck_items: res.data[2],
          allInvitees: res.data[1]
        });
      })
      .then(() => {
        axios
          .get(`/users/getNewInviteesPotluck/${this.props.potluckID["potluckID"]}/${this.state.potluck_info.organizer_id}`)
          .then(res => {
            this.setState({
              following: res.data
            });
          });
      })
      .then( () => {
        this.state.allInvitees.filter( invitee => {
          if (this.props.user.user_id === invitee.user_id) {
            axios
              .patch(`/users/seenPotluckChangeByUserID/${this.props.user.user_id}/${invitee.potluck_id}`)
              .then( () => {
                this.setState({
                  seenPotluck: true
                })
              })
           }
        })
      })
      .catch(err => {
        this.setState({
          message: `${err.response}`
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
    const { selectedRsvpValue } = this.state;
    this.setState({
      selectedRsvpValue: e.target.value
    });
    axios
      .post(`/users/changePotluckRSVP/${this.props.potluckID["potluckID"]}`, {
        invitee_rsvp: e.target.value,
        user_id: e.target.id
      })
      .then(() => {
        axios
          .get(`/users/getsinglepotluck/${this.props.potluckID["potluckID"]}`)
          .then(res => {
            this.setState({
              potluck_invitations: res.data[1],
            });
          })
       })
      .catch(err => {
        this.setState({
          message: `${err.response.data}`
        });
      })
  };

  submitInvite = e => {
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
    const { potluck_info, potluck_items, potluck_invitations } = this.state;
    const stateOptions = this.state.following.map(elem => ({
      value: elem.user_id,
      label: elem.username
    }));
    return (
      <div className="PotluckFullPage">
        <Searchbar user={this.props.user} />
        <div className="Potluckpage">
        <img className="potluckPageHeaderImage"  />
        <div className="PotluckContainer">
        <div className="PotluckInfo" >
        <PotluckModal className="potluckModalEventPage"/>
          <h2> {potluck_info.potluck_name} </h2>
          <h2> <img className="potluckCalendarImage" src="https://png.icons8.com/metro/1600/calendar.png"/> {potluck_info.potluck_date} </h2>
          <h2> <img className="potluckTimeImage" src="http://cdn.onlinewebfonts.com/svg/img_374773.png" /> {potluck_info.potluck_time} </h2>
          <h2> <img className="potluckLocationImage" src="https://d30y9cdsu7xlg0.cloudfront.net/png/11205-200.png" /> {potluck_info.potluck_location} </h2>
          <h2> Organized by {potluck_info.username} </h2>
          </div>
          <div className="potluckInvitees">
            <h2> Invitees </h2>
            <table className="potluckTable">
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
            
            <Select
              name="form-field-name"
              multi
              value={this.state.selectedValues}
              onChange={this.handleInvitationSelect}
              options={stateOptions}
              className="potluckInviteFriendSelect"
              placeholder="Invite friends"
            />

            <button onClick={this.submitInvite}> Submit </button>
            </div>
   
            <div className="PotluckDishes">
            <h2> Things to bring </h2>
            <table className="potluckTable">
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
              placeholder="suggest item"
              name="suggestedItem"
              value={this.state.suggestedItem}
              onChange={this.handleFormInput}
            />
            <button onClick={this.addNewItemToList}> Add new item </button>
          </div>
        </div>
        </div>
        </div>
    );
  }
}

export default Potluck;
