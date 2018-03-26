import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const AllGroups = ({ user, groups }) => {
  return(
    <div>
      <h1>Groups Page</h1>
      <p>Find groups below</p>
      <div></div>
      {groups.map(group => {
        let path = `/cb/groups/${group.group_id}`
        return(
          <Link to={path}>{group.group_name}</Link>
        )
      })}
    </div>
  )
}

export default AllGroups
