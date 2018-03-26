import React from 'react'
import axios from 'axios'

const GroupButtons = ({ userID, ownerID, isMember, members, join, leave }) =>{

  members = members ? members : []

  if(userID === parseInt(ownerID)){
    return(<div></div>)
  }
  else if(members.find(member => member.user_id === userID) !== undefined){
    return(<button onClick={leave}>Leave Group</button>)
  }
  else if(isMember){
    return(<button onClick={leave}>Leave Group</button>)
  }
  else{
    return(<button onClick={join}>Join Group</button>)
  }
}

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
      message: ''
    }
  }

  getGroupInfo = () =>{
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




  render(){
    const { group_name, group_owner_id, group_owner_name, isMember, allMembers, group_description } = this.state
    console.log('reed',this.state.allMembers)
    if(this.props.user){
      return(
        <div>
          <h1>{group_name}</h1>
          <h3>This group was created by {group_owner_name}</h3>
          <p>{group_description}</p>
            <GroupButtons
              userID={this.props.user.user_id}
              ownerID={group_owner_id}
              isMember={isMember}
              members={allMembers}
              join={this.joinGroup}
              leave={this.leaveGroup}
              />
            <h4>Members</h4>
            {allMembers ? allMembers.map(member =>(
              <p>{member.username}</p>
            )) : <div></div>}
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
