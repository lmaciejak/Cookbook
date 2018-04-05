import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import List from '../List/List'

// const styles = {
//   membersContainer: {
//     width: "100%",
//     height: "100%"
//   }
// }

class GroupMembers extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      members: [],
      group_name: ''
    }
  }

  getGroupInfo = () =>{
    const { group_name, members } = this.state
    axios
      .get(`/users/getSingleGroup/${this.props.groupID}`)
      .then(res => {
        this.setState({
          group_name: res.data[0].group_name,
        })
      })
      .catch(error => {
        console.log('groups error')
      })
    axios
      .get(`/users/getAllGroupFollowers/${this.props.groupID}`)
      .then(res => {
        this.setState({
          members: res.data
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  componentDidMount(){
    this.getGroupInfo()
  }

  render(){
    const { members, group_name } = this.state
    if(members !== []){
      return(
        <div>
          <h1>All Members for {group_name}</h1>
          <List users={members} />
        </div>
      )
    }
    else {
      return(
        <div>
          <h3>No Members Yet</h3>
        </div>
      )
    }
  }
}

export default GroupMembers
