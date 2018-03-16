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
    transform             : 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root')

class LoginUser extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '', 
      isLoggedIn: false,
      message: '',
      modalIsOpen: false
    }
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = '#fa0';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  handleFormInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleLoginFormSubmit = e => {
    e.preventDefault();

    const { username, password } = this.state;
    axios
      .post("/login", {
        username: username,
        password: password
      })
      .then(res => {
        this.setState({
          message: 'success', 
          isLoggedIn: true,
        });
      })
      .catch(err => {
        this.setState({
          username: "",
          password: "",
          message: `Error logging in.  Error message: ${err}`
        });
      });  
  }

  render() {
    if(this.state.isLoggedIn === true) { 
      return <Redirect to='/feed' />
    }
    console.log('this.state', this.state)
    return (
      <div className="Modal">
      <div>
      <button onClick={this.openModal}>Log in</button>
      <Modal
        isOpen={this.state.modalIsOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        style={customStyles}
      >

        <h2 ref={subtitle => this.subtitle = subtitle}>Log In</h2>
        <form>
          <input className="input" type="text" placeholder="Username" onChange={this.handleFormInput} name='username'></input>
          <input className="input" type="password" placeholder="Password" onChange={this.handleFormInput} name='password'></input>
          <button>Log in</button>
        </form>
        <button onClick={this.closeModal}>close</button>
      </Modal>
    </div>
      </div>
    );
  }
}

export default LoginUser;