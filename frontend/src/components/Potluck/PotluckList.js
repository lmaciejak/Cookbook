import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { Redirect } from "react-router-dom";


class PotluckList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "",
      potluck_info: [],
      potluck_invitations: [],
      potluck_items: [],
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

  render(props) {
    const { potluck_info, potluck_items, potluck_invitations } = this.state;

    return (
      <div className="Potluckpage">
        <div className="PotluckContainer">
      <h1> My Potlucks </h1> 
      
        </div>
      </div>
    );
  }
}

export default PotluckList;

// <Searchbar user={this.props.user} />