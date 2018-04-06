import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router'
import GroupButtons from './GroupButtons'
import Links from './GroupLinks'
import Searchbar from "../Search/SearchBar";

class SingleGroup extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      group_name: '',
      group_owner_id: '',
      group_owner_name: '',
      group_description: '',
      isMember: false,
      allMembers: '',
      deleted: false,
      message: ''
    }
  }

  getGroupInfo = () =>{
    const { group_name, group_owner_id, group_owner_name, group_description } = this.state
    axios
      .get(`/users/getSingleGroup/${this.props.groupID}`)
      .then(res => {
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
    axios
      .get(`/users/getAllGroupFollowers/${this.props.groupID}`)
      .then(res => {
        this.setState({
          allMembers: res.data
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  componentDidMount(){
    this.getGroupInfo()
  }



  joinGroup = () =>{
    axios
      .post('/users/joinGroup', {
        user_id: this.props.user.user_id,
        group_id: this.props.groupID
      })
      .then(res => {
        this.setState({
          isMember: true,
          message: 'You have followed this group!'
        })
        this.getGroupInfo()
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
          isMember: false,
          message: 'You have left this group!'
        })
        this.getGroupInfo()
      })
      .catch(error => {
        console.log('error leaving group')
      })
  }

  deleteGroup = () =>{
    axios
      .post('/users/deleteGroup',{
        group_id: parseInt(this.props.groupID)
      })
      .then(res => {
        this.setState({
          group_name: '',
          group_owner_id: '',
          group_owner_name: '',
          group_description: '',
          isMember: false,
          allMembers: '',
          deleted: true,
          message: ''
        })
      })
      .catch(error => {
        console.log('error deleting group')
      })
  }


  render(){
    const { group_name, group_owner_id, group_owner_name, isMember, deleted, allMembers, group_description } = this.state
    let groupIDNum = parseInt(this.props.groupID)
    const memberspath = `/cb/groups/${groupIDNum}/members`
    const membersrecipespath = `/cb/groups/${groupIDNum}/recipes`
    if(deleted){
      return(
        <Redirect to='/cb/groups' />
      )
    }
    if(this.props.user){
      return(
        <div className='groups-bg'>
        <Searchbar user={this.props.user} />
        <div className='single-groups-container'>
          <h1 className='group-main-header'>{group_name}</h1>
          <h3 className='group-header'>This group was created by {group_owner_name}</h3>
          <p>{group_description}</p>
            <nav>
              {" "}
              <Links
                members={allMembers}
                userID={this.props.user.user_id}
                link={memberspath}
                ownerID={group_owner_id}
                name='Members'
                />
              {" "}
              <Links
                members={allMembers}
                userID={this.props.user.user_id}
                link={membersrecipespath}
                ownerID={group_owner_id}
                name='Group Recipes'
                />
            </nav>
            <GroupButtons
              userID={this.props.user.user_id}
              ownerID={group_owner_id}
              isMember={isMember}
              members={allMembers}
              join={this.joinGroup}
              leave={this.leaveGroup}
              remove={this.deleteGroup}
              />
            </div>
        </div>
      )
    }
    else {
      return(
        <div>
          <h1>{group_name}</h1>
          <h3>This group was created by {group_owner_name}</h3>
          <p>{group_description}</p>
        </div>
      )
    }
  }
}

export default SingleGroup
