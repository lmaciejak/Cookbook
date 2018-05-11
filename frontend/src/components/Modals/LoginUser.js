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
      modalIsOpen: false,
      loggedIn: false,
      toggle: false,
    }
    this.openModal = this.openModal.bind(this);
    this.closeModalLogin = this.closeModalLogin.bind(this);
  }
 componentWillMount() {
   axios
    .get('/isloggedin')
    .then(res => {
      this.setState({
        loggedIn: res.data
      })
    })
    .catch( (err) => {
      this.setState({
        loggedIn: err.response.status
      })
    })
 }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModalLogin() {
    this.setState({modalIsOpen: false, message: ''});
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
      .post("/users/login", {
        username: username,
        password: password
      })
      .then(res => {
        this.setState({
          message: "success",
          isLoggedIn: true,
        });
      })
      .catch(err => {
        this.setState({
          username: "",
          password: "",
          message: `${err.response.data}`
        });
      });
  }

  handleClickLogOut = () => {
    axios
      .get("/users/logout")
      .then( (res) => {
        this.setState({
          loggedIn: false
        })
      })
      .catch( (err) => {
        console.log(err);
      })
  }

  render() {
    if(this.state.isLoggedIn === true) {
      return <Redirect to='/cb/feed' />
    }
    return (
      <div className="Modal">
      <div>
      {this.state.loggedIn === "loggedIn"? <a href="/"><button onClick={this.handleClickLogOut} className="button formButton logOutButton">Log Out</button> </a>:<button className="button formButton" onClick={this.openModal}>Log in</button>}
      <Modal
        isOpen={this.state.modalIsOpen}
        onRequestClose={this.closeModalLogin}
        style={customStyles}
      >
      <button className="xButton" onClick={this.closeModalLogin}>x</button>
        <h2 ref={subtitle => this.subtitle = subtitle}>Log In</h2>
        <form onSubmit={this.handleLoginFormSubmit}>
          <input className="input formInput" type="text" placeholder="Username" onChange={this.handleFormInput} name='username' value={this.state.username}></input>
          <input className="input formInput" type="password" placeholder="Password" onChange={this.handleFormInput} name='password' value={this.state.password}></input>
          <button className="formButton">Log in</button>
        </form>
        <p>{this.state.message}</p>
      </Modal>
      </div>
      </div>
    );
  }
}

export default LoginUser;
