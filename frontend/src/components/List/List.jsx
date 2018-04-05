import React from 'react'

const styles = {
  userContainer: {
    width: "100vh",
    height: "100vh",
    margin: "0 auto"
  },
  userInfo: {
    height: "100%",
    width: "80%",
    float: "right",
    textAlign: "center",
  },
  imgBox: {
    float: "right",
    width: "20%",
    height: "100%",
  },
  img: {
    height: "100%",
    width: "100%"
  },
  username: {
    margin: "0"
  }
}

const List = ({ users }) =>(
  <div style={styles.userContainer}>
    {users.map(user =>(
      <div style={styles.userWrap}>
      <div style={styles.userInfo}>
        <h2 style={styles.username}>{user.username}</h2>
          <span>{user.first_name}  {user.last_name}</span>
      </div>
      <div style={styles.imgBox}>
        <img src={user.user_img} alt='user image' style={styles.img}/>
      </div>
      </div>
    ))}
  </div>
)

export default List
