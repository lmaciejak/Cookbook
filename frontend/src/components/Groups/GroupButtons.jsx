import React from 'react'

const GroupButtons = ({ userID, ownerID, isMember, members, join, leave, remove }) =>{

  members = members ? members : []

  if(userID === parseInt(ownerID)){
    return(<button onClick={remove}>Delete Group</button>)
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

export default GroupButtons
