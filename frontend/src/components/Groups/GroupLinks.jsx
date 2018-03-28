import React from 'react'
import { Link } from 'react-router-dom'

const Links = ({ members, userID, ownerID, link, name }) =>{
  members = members ? members : []
  if(userID === parseInt(ownerID)){
    return(<Link to={link}>{name}</Link>)
  }
  else if(members.find(member => member.user_id === userID) !== undefined){
    return(<Link to={link}>{name}</Link>)
  }
  else {
    return(<div></div>)
  }
}

export default Links
