import React from 'react'
import axios from 'axios'
import { Route, Switch } from 'react-router'

class Cookbook extends React.Component {
  constructor() {
    super()

    this.state = {
      loggedIn: false,
      user: '',
      allUsers: '',
      allRecipes: '',
      featuredRecipes: ''
    }
  }

  componentDidMount() {
    /* Axios calls to get users, all users, all recipes, and highesr rated recipes*/
    const getUser = () => axios.get('/users/').then(
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
    const getFeaturedRecipes = () => axios.get(
        'request for feautured recipes').then(
        response => {
          this.setState({
            featuredRecipes: response
          })
        }
      )
      /* Making all axios calls at once*/
    axios.all([getUser(), getAllUsers(), getAllRecipes(),
        getFeaturedRecipes()
      ])
      .then(axios.spread(function(response1, response2, response3,
        response4) {
        console.log('worked')
      }))
      .catch(error => {
        console.log('derp')
      })
  }



  render() {

    return (
     <div>
      <Switch>
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
