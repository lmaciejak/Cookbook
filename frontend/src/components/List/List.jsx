
import React from 'react'

const List = ({ users }) =>(
  <div>
    {users.map(user =>(
      <div>
        <h3>{user.first_name} + '' + {user.last_name}</h3>
        <p>{user.username}</p>
        <p>{user.email}</p>
      </div>
    ))}
  </div>
)

export default List
