import React from 'react'
import axios from 'axios'
import { Route, Switch } from 'react-router'
import { Redirect } from 'react-router'
import Feed from './Feed/Feed'
import UserProfile from './Profile/UserProfile'
import UserEdit from "./Profile/UserEdit";
import Recipe from './SingleRecipe/Recipe'
import LoginUser from './Modals/LoginUser'
import RegisterUser from './Modals/RegisterUser'
import Groups from './Groups/Groups'
import AddRecipe from './SingleRecipe/AddRecipe'
import EditRecipe from './SingleRecipe/EditRecipe'
import Potluck from './Potluck/Potluck';
import PotluckList from './Potluck/PotluckList';

class Cookbook extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
      fetchingUser: true,
    }
  }

  loggedInUser = () => {
    axios.get('/users')
    .then(response =>{
      if(response.data){
        this.setState({
          user: response.data[0],
          fetchingUser: false
        })
      }
    })
    .catch(error =>{
      console.log('user fetch did not work')
    })
  }

  componentDidMount(){
    this.loggedInUser();
  }

  renderAddRecipe = props => {
    const { user, fetchingUser } = this.state
    if (fetchingUser) {
      return <div>loading!</div>
    } else if(!user) {
      return <Redirect to='/' />
    } else {
      return <AddRecipe user={user} />
    }
  }

  renderUserProfile = props => {
    const { id } = props.match.params
    const { user, fetchingUser } = this.state
    if (fetchingUser) {
      return <div>loading!</div>
    } else if (!user) {
        return <Redirect to='/' />
    } else {
      return <UserProfile user={user} id={id}/>
    }
  }

  renderSingleRecipe = props => {
    const { userID, recipeID } = props.match.params
    const { user } = this.state
    return <Recipe id={user.user_id} user={props.match.params}  userinfo={user} />
  }

  renderUserFeed = props =>{
    const { id } = props.match.params
    const { user, fetchingUser } = this.state
    if (fetchingUser) {
      return(<div>loading!</div>)
    } else if (!user) {
      return <Redirect to='/' />
    } else {
      return <Feed user={user} />
    }
  }

  renderUserEdit = props => {
    const { user, fetchingUser } = this.state
    const { id } = props.match.params;
    if (fetchingUser) {
      return <div>loading!</div>
    } else if (!user) {
      return <Redirect to='/' />
    } else {
      return <UserEdit user={user} id={id}/>
    }
  };

  renderGroups = () =>{
    const { user } = this.state
    return <Groups user={user} />
  }

  renderPotluck = props =>{
    const { user } = this.state
    const { potluckID } = props.match.params
    return(
      <Potluck user={user} potluckID={props.match.params} />
    )
  }

  renderPotluckList = props =>{
    const { user } = this.state
    return(
      <PotluckList user={user}  />
    )
  }


  render() {
    const { user } = this.state
    return (
     <div>
      <Switch>
        <Route exact path='/cb/groups' render={this.renderGroups} />
        <Route path='/cb/potluck/:potluckID' render={this.renderPotluck} />
        <Route path='/cb/potlucks' render={this.renderPotluckList} />
        <Route path='/cb/groups/:groupID' component={Groups} />
        <Route exact path='/cb/profile/:id' render={this.renderUserProfile} />
        <Route path='/cb/profile/:id/favorites' render={this.renderUserProfile} />
        <Route path='/cb/profile/:id/edit' component={UserEdit} />
        <Route path='/cb/addrecipe' render={this.renderAddRecipe} />
        <Route path='/cb/editRecipe/:recipeID' component={EditRecipe} />
        <Route exact path='/cb/:userID/:recipeID' render={this.renderSingleRecipe} />
        <Route path='/cb/:userID/:recipeID/edit' component={Recipe} />
        <Route exact path='/cb/feed' render={this.renderUserFeed} />
      </Switch>
    </div> )
  }
}

export default Cookbook
