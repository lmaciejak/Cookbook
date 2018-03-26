import React from 'react'
import axios from 'axios'

class SingleGroup extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      group_name: '',
      group_owner_id: '',
      group_owner_name: '',
      group_description: '',
      message: ''
    }
  }

  componentDidMount(){
    const { group_name, group_owner_id, group_owner_name, group_description } = this.state
    axios
      .get(`/users/getSingleGroup/${this.props.groupID}`)
      .then(res => {
        console.log(res)
        this.setState({
          group_name: res.data[0].group_name,
          group_owner_id: res.data[0].user_id,
          group_owner_name: res.data[0].username,
          group_description: res.data[0].group_description
        })
      })
      .catch(error => {
        console.log('groups error')
      })
  }


  joinGroup = () =>{
    axios
      .post('/users/joinGroup', {
        user_id: this.props.user.user_id,
        group_id: this.props.groupID
      })
      .then(res => {
        this.setState({
          message: 'You have followed this group!'
        })
      })
      .catch(error => {
        console.log('error following group')
      })
  }

  leaveGroup = () =>{
    axios
      .post('/users/leaveGroup', {
        user_id: this.props.user.user_id,
        group_id: this.props.groupID
      })
      .then(res => {
        this.setState({
          message: 'You have left this group!'
        })
      })
      .catch(error => {
        console.log('error leaving group')
      })
  }




  render(){
    const { group_name, group_owner_id, group_owner_name, group_description } = this.state
    console.log(this.state)
    if(this.props.groupID){
      return(
        <div>
          <h1>{group_name}</h1>
          <h3>This group was created by {group_owner_name}</h3>
          <p>{group_description}</p>
        </div>
      )
    }
    else {
      return(
        <div>Loading single group</div>
      )
    }
  }
}

export default SingleGroup
