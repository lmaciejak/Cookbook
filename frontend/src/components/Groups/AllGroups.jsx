import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './Groups.css'

const AllGroups = ({ user, groups }) => {
  return(
    <div className='groups-bg'>
      <div className='allgroups-container'>
        <p className='group-main-header'>Groups of Cookbook</p>
        <div>
          {groups.map(group => {
            let path = `/cb/groups/${group.group_id}`
            return(
              <div className='group-links-wrap'>
                <div className='group-links-container'>
                  {" "}
                  <Link to={path} className='group-links'>{group.group_name}</Link>
                  <p>{group.group_description}</p>
                  {" "}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default AllGroups
