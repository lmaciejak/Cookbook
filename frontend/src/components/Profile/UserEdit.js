import React from "react"
import axios from 'axios'
import LoginUser from '../Modals/LoginUser'

class UserEdit extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      usernameInput: '',
      firstnameInput: '',
      lastnameInput: '',
      emailInput: '',
      message: ''
    }
  }

  userInput = (event) =>{
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  submitEdit = () =>{
    const { usernameInput, firstnameInput, lastnameInput, emailInput, relogin } = this.state
    const uniqueUsername = this.props.allUsers.data.find(user => user.username === usernameInput)

    if(!uniqueUsername){
      let newUsername = usernameInput ? usernameInput : this.props.user.data[0].username
      let newFirstName = firstnameInput ? firstnameInput : this.props.user.data[0].first_name
      let newLastName = lastnameInput ? lastnameInput : this.props.user.data[0].last_name
      let newEmail = emailInput ? emailInput : this.props.user.data[0].email

      axios.patch(`/users/edit/${this.props.user.data[0].user_id}`,{
        username: newUsername,
        first_name: newFirstName,
        last_name: newLastName,
        email: newEmail
      })
      .then(
        axios.get('/users/logout')
        .then(() =>{
          this.setState({
            usernameInput: '',
            firstnameInput: '',
            lastnameInput: '',
            emailInput: '',
            message: 'Changes done'
          })
        })
        .catch(error =>{
          console.log('this failed you')
        })
      )
    }
    else {
      this.setState({
        usernameInput: '',
        firstnameInput: '',
        lastnameInput: '',
        emailInput: '',
        message: 'Username is taken'
      })
    }
  }


  render(){
    const {  usernameInput, relogin, firstnameInput, lastnameInput, emailInput, message } = this.state
    console.log(this.props)
    if (this.props.user.data) {
      if(!this.props.isProfile){
        return(
          <div>
            <h2>Edit Profile Information for {this.props.user.data[0].username}</h2>
            <div>
              <label>
                  New Username: {" "}
                  <input
                    type='text'
                    value={usernameInput}
                    name='usernameInput'
                    onChange={this.userInput}
                    />
                </label>
            </div>
            <div>
              <label>
                New First Name: {" "}
                <input
                  type='text'
                  value={firstnameInput}
                  name='firstnameInput'
                  onChange={this.userInput}
                  />
              </label>
            </div>
            <div>
              <label>
                New Last Name: {" "}
                <input
                  type='text'
                  value={lastnameInput}
                  name='lastnameInput'
                  onChange={this.userInput}
                  />
              </label>
            </div>
            <div>
              <label>
                New Email: {" "}
                <input
                  type='text'
                  value={emailInput}
                  name='emailInput'
                  onChange={this.userInput}
                  />
              </label>
            </div>
            {message}
            <button onClick={this.submitEdit}>Submit Changes</button>
          </div>
        )
      }
      else {
        return(
          <div>This is not your profile to edit</div>
        )
      }
  }
    else {
      return (
        <div>loading!</div>
      )
    }
  }
}

export default UserEdit
