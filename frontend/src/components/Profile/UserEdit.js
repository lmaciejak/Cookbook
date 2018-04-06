import React from "react"
import axios from 'axios'
import { Link } from 'react-router-dom'
import Searchbar from "../Search/SearchBar";

class UserEdit extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      user: '',
      usernameInput: '',
      firstnameInput: '',
      lastnameInput: '',
      emailInput: '',
      imageInput: '',
      message: ''
    }
  }

  componentDidMount() {
    if(!this.props.user){
      axios
        .get('/users')
        .then(res => {
          this.setState({ user: res.data[0]})
        })
        .catch(error => {
          console.log('error in edit page')
        })
    }
  }

  userInput = (event) =>{
    this.setState({
      [event.target.name]: event.target.value
    })
  }


  submitEdit = () =>{
    const { user, usernameInput, firstnameInput, lastnameInput, imageInput, emailInput, relogin } = this.state

      axios
        .patch(`/users/edit/${user.user_id}`,{
          username: usernameInput ? usernameInput : user.username,
          first_name: firstnameInput ? firstnameInput: user.first_name,
          last_name: lastnameInput ? lastnameInput : user.last_name,
          imageInput: imageInput ? imageInput : user.user_img,
          email: emailInput ? emailInput : user.email
      })
        .then(() => {
          this.setState({
            usernameInput: '',
            firstnameInput: '',
            lastnameInput: '',
            emailInput: '',
            imageInput: '',
            message: 'Changes done!'
          })
        })
    }


  render(){
    const {  user, usernameInput, firstnameInput, lastnameInput, imageInput, emailInput, message } = this.state

    if (user) {
      let path = `/cb/profile/${user.user_id}`
        return(
          <div className="formContainer">
            <div className="formStyle">
            <h1 className="formHeader">Edit Profile Information for {user.username}</h1>


          <div className="formSection">
              <div className="formInnerWrap">
                      <label className="formlabels">
                          New Username: {" "}
                          <input
                            type='text'
                            value={usernameInput}
                            name='usernameInput'
                            onChange={this.userInput}
                            />
                        </label>
                </div>
            </div>


            <div className="formSection">
              <div className="formInnerWrap">
                <label className="formlabels">
                    New Profile Image: {" "}
                    <input
                      type='text'
                      value={imageInput}
                      name='imageInput'
                      onChange={this.userInput}
                      />
                  </label>
              </div>
            </div>


            <div className="formSection">
              <div className="formInnerWrap">
                <label className="formlabels">
                  New First Name: {" "}
                  <input
                    type='text'
                    value={firstnameInput}
                    name='firstnameInput'
                    onChange={this.userInput}
                    />
                </label>
              </div>
            </div>


            <div className="formSection">
              <div className="formInnerWrap">
                <label className="formlabels">
                  New Last Name: {" "}
                  <input
                    type='text'
                    value={lastnameInput}
                    name='lastnameInput'
                    onChange={this.userInput}
                    />
                </label>
              </div>
            </div>


            <div className="formSection">
              <div className="formInnerWrap">
                <div className="formlabels">
                  <label className="formlabels">
                    New Email: {" "}
                    <input
                      type='text'
                      value={emailInput}
                      name='emailInput'
                      onChange={this.userInput}
                      />
                  </label>
                </div>
              </div>
            </div>


              {message}
            <button onClick={this.submitEdit} className="formButton">Submit Changes</button>
            <Link to={path}>Back to Profile</Link>
            </div>
          </div>
        )
  }
    else {
      return (
        <div>loading!</div>
      )
    }
  }
}

export default UserEdit
