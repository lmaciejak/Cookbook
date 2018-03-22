import React from 'react'
import axios from 'axios'
import { Route, Switch } from 'react-router'
import Feed from './Feed/Feed'
import List from './List/List'
import UserEdit from './Profile/UserEdit'
import LoginUser from './Modals/LoginUser'
import UserFaves from './Profile/UserFaves'

class Cookbook extends React.Component {
  constructor() {
    super()

    this.state = {
      loggedIn: false,
      user: '',
      allUsers: '',
      allRecipes: '',
    }
  }

  componentDidMount() {
    /* Axios calls to get users, all users, all recipes, and highesr rated recipes*/
    const getUser = () => axios.get('/users').then(
      response => {
        this.setState({
          user: response,
          loggedIn: true
        })
      })
    const getAllUsers = () => axios.get('/users/allusers').then(
      response => {
        this.setState({
          allUsers: response
        })
      })
    const getAllRecipes = () => axios.get('/users/allrecipes').then(
      response => {
        this.setState({
          allRecipes: response
        })
      })
      /* Making all axios calls at once*/
    axios.all([getUser(), getAllUsers(), getAllRecipes()
      ])
      .then(axios.spread(function(response1, response2, response3) {
        console.log('worked')
      }))
      .catch(error => {
        console.log('derp')
      })
  }

  renderUserEdit = () =>{
    const { user, allUsers, loggedIn } = this.state
    return(
      <UserEdit user={user} allUsers={allUsers} loggedIn={loggedIn}/>
    )
  }

  renderUserFaves = () =>{
    const { user } = this.state
    return(
      <UserFaves user={user} />
    )
  }


  render() {
    console.log(this.state)
    const { user } = this.state
    return (
     <div>
      <Switch>

      </Switch>
    </div> )
  }
}

export default Cookbook
