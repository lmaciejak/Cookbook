import React from "react"
import axios from 'axios'

class UserEdit extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      user: this.props.user,
      firstnameInput: '',
      lastnameInput: '',
      emailInput: ''
    }
  }

  render(){
    const { user, firstnameInput, lastnameInput, emailInput } = this.state
    console.log('XAVI!!',this.props)
    return(
      <div>

      </div>
    )
  }
}

export default UserEdit
