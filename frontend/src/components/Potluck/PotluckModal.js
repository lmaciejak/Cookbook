import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import axios from "axios"
import { Redirect } from "react-router-dom"

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)', 
    width                 : '420px',
  }
};

Modal.setAppElement('#root')

class PotluckModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      potluck_name: '',
      potluck_description: '',
      potluck_date: '', 
      potluck_time: '', 
      potluck_location: '', 
      isLoggedIn: false,
      message: '',
      modalIsOpen: false
    }
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false, message: ''});
  }

  handleFormInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleLoginFormSubmit = e => {
    e.preventDefault();

    const { potluck_name, potluck_description, potluck_date, potluck_time, potluck_location } = this.state;
    axios
      .post("/users/createpotluck", {
        potluck_name: potluck_name,
        potluck_description: potluck_description, 
        potluck_date: potluck_date,
        potluck_time: potluck_time, 
        potluck_location: potluck_location
      })
      .then(res => {
        this.setState({
          message: 'success',
          isLoggedIn: true,
        });
      })
      .catch(err => {
        this.setState({
          potluck_name: "",
          potluck_description: "",
          message: `${err.response.data}`
        });
      });
  }

  render() {
    console.log('props user', this.props.user)
    if(this.state.isLoggedIn === true) {
      return <Redirect to='/cb/feed' />
    }
    return (
      <div className="Modal PotluckModal">
      <div>
      <button className="button formButton" onClick={this.openModal}>New Potluck</button>
      <Modal
        isOpen={this.state.modalIsOpen}
        onRequestClose={this.closeModal}
        style={customStyles}
      >
      <button className="xButton" onClick={this.closeModal}>x</button>
        <h2 ref={subtitle => this.subtitle = subtitle}>Create a new potluck</h2>
        <form onSubmit={this.handleLoginFormSubmit}>
          <input className="input formInput" type="text" placeholder="Potluck Name" onChange={this.handleFormInput} name='potluck_name'></input>
          <textarea className="input formInput" type="text" placeholder="Description" onChange={this.handleFormInput} name='potluck_description'></textarea>
          <input className="input formInput" type="date" placeholder="Date" onChange={this.handleFormInput} name='potluck_date'></input>
          <input className="input formInput" type="time" placeholder="Time" onChange={this.handleFormInput} name='potluck_time'></input>
          <input className="input formInput" type="text" placeholder="Location" onChange={this.handleFormInput} name='potluck_location'></input>
          <button className="formButton">Create</button>
        </form>
        <p> {this.state.message} </p>
      </Modal>
      </div>
      </div>
    );
  }
}

export default PotluckModal;
