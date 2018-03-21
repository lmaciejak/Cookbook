import React from 'react'
import axios from 'axios'
import { Route, Switch } from 'react-router'
import Feed from './Feed/Feed'
import List from './List/List'
import UserEdit from './Profile/UserEdit'
import LoginUser from './Modals/LoginUser'

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

  renderUserFeed = () =>{
    const { user, allUsers, loggedIn } = this.state
    return(
      <Feed user={user} allUsers={allUsers} loggedIn={loggedIn}/>
    )
  }


  render() {
    console.log(this.state)
    const { user } = this.state
    return (
     <div>
      <Switch>
      <Route exact path='/feed' component={Feed} />
        /*User Profile props = user, loggedIn */
        /*User Edit props = user, loggedIn*/
        /*User Faves props = user, loggedIn*/
        /*User Recipes props = user, loggedIn, allRecipes*/
        /*Feed recieves user, loggedIn and allRecipes on cookbook/profile/:userID*/
        /**/
      </Switch>
    </div> )
  }
}

export default Cookbook
