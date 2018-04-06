import React from 'react'

const styles = {
  userContainer: {
    width: "100vh",
    height: "100vh",
    margin: "0 auto",
    // backgroundColor: "rgb(241, 224, 255)"
  },
  userInfo: {
    height: "100%",
    width: "80%",
    float: "right",
    textAlign: "center",
    backgroundColor: "rgb(241, 224, 255)",
  },
  userWrap: {
    width: "59em",
    height: "15em"
  },
  imgBox: {
    float: "right",
    width: "20%",
    height: "100%",
    backgroundColor: "rgb(241, 224, 255)",
  },
  img: {
    height: "100%",
    width: "100%"
  },
  username: {
    margin: "0",
    color: "#e90c1a"
  },
  groupName: {
    color: "#e90c1a",
    textAlign: "center",
    fontSize: "280%",
    marginTop: "2em",
    backgroundColor: "rgb(241, 224, 255)"
  }
}

const List = ({ users, name }) =>(
  <div style={styles.userContainer}>
    <h1 style={styles.groupName}>{name}</h1>
    {users.map(user =>(
      <div style={styles.userWrap}>
      <div style={styles.userInfo}>
        <h2 style={styles.username}>{user.username}</h2>
          <p>{user.first_name}  {user.last_name}</p>
          <p>{user.email}</p>
      </div>
      <div style={styles.imgBox}>
        <img src={user.user_img} alt='user image' style={styles.img}/>
      </div>
      </div>
    ))}
  </div>
)

export default List
