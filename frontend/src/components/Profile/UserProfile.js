import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import axios from "axios";
import RecipeBox from "../SingleRecipe/RecipeBox";
import Recipe from "../SingleRecipe/Recipe";
import UserEdit from ".//UserEdit";
import UserFaves from './UserFaves'
// import AddRecipe from './SingleRecipe/AddRecipe'

class UserProfile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      allusersRecipes: [],
      user: '',
      canFollow: true,
      ingredients: [],
      selectedValue: "",
      favorites_count: "",
      username: "",
      img: "",
      recipe_name: "",
      recipe: "",
      isvegeterian: "",
      isvegan: "",
      recipe_timestamp: "",
      description: ""
    }
  }

  renderSingleRecipe = () => {
    const { favorites_count, username, img,
            recipe_name, recipe, isvegeterian,
            isvegan, recipe_timestamp, ingredients,
            description } = this.state;
    return <Recipe
              favorites_count={favorites_count}
              username={username}
              img={img}
              recipe_name={recipe_name}
              recipe={recipe}
              isvegeterian={isvegeterian}
              isvegan={isvegan}
              recipe_timestamp={recipe_timestamp}
              ingredients={ingredients}
              description={description}
           />
  }


  componentDidMount() {
    axios
			.get(`/users/allrecipes/${this.props.id}`)
      .then( (res) => {
        this.setState({
          allusersRecipes: res.data
        })
      })
      .then(
        axios
          .get(`/users/profile/${this.props.id}`)
          .then(res =>{
            this.setState({
              user: res.data
            })
          })
      )
      .then(
        axios
          .get(`/users/getfolloweebyid/${this.props.user.user_id}/${this.props.id}`)
          .then(res =>{
            if(this.props.user.user_id === this.props.id){
              this.setState({
                canFollow: false
              })
            }
            else if(res.data === []){
              this.setState({
                canFollow: true
              })
            }
            else {
              this.setState({
                canFollow: false
              })
            }
          })
      )
			.catch(err => {
				console.log(err);
			})
  }

  handleSelectValue = (e) => {
    const { selectedValue, allusersRecipes } = this.state;
    this.setState({
      selectedValue: e.target.value
    })
  }

  handleUserFollow = () => {
    axios
      .post('/users/followUser',{
        follower_id: this.props.user.user_id,
        followee_id: this.props.id
      })
      .then(res =>{
        this.setState({
          canFollow: false
        })
        console.log('Followed success')
      })
      .catch(error =>{
        console.log('Failed follow')
      })
  }

  handleUserUnfollow = () => {
    console.log(this.props.user)
    axios
      .post('/users/unfollowUser',{
        follower_id: this.props.user.user_id,
        followee_id: this.props.id
      })
      .then(res =>{
        this.setState({
          canFollow: true
        })
        console.log('unfollowed user')
      })
      .catch(error =>{
        console.log('failed to unfollow')
      })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { selectedValue, allusersRecipes } = this.state;
    if (selectedValue === "mostRecent") {
      axios
        .get(`/users/getallrecentusersrecipes/${this.props.user}`)
        .then( (res) => {
          this.setState({
            allusersRecipes: res.data
          })
        })
        .catch(err => {
          console.log(err);
        })
    } else if (selectedValue === "mostTop") {
      axios
        .get(`/users/getmosttoprecipes/${this.props.user}`)
        .then( (res) => {
          this.setState({
            allusersRecipes: res.data
          })
        })
        .catch(err => {
          console.log(err);
        })
    }
  }

  renderUserEdit = () =>{
    const { user } = this.state
    return(
      <UserEdit user={user} />
    )
  }

  renderAllUserRecipes = () =>{
    const { allusersRecipes } = this.state
    return(
      <div>
        <h1>All</h1>
        {allusersRecipes.map(recipe =>(
          <RecipeBox recipe={recipe} />
        ))}
      </div>
    )
  }

  renderUserFavorites = props =>{
    const { id } = props.match.params
    return(
      <UserFaves id={id} />
    )
  }

  render() {
    const { allusersRecipes, canFollow } = this.state;
    let isOwnProfile = this.props.user.user_id === this.props.id

    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <select onChange={this.handleSelectValue}>
            <option>Select</option>
            <option value="mostTop">Most Top</option>
            <option value="mostRecent">Most Recent</option>
          </select>
          <button>Submit</button>
        </form>
        <div>
          {canFollow ?
              <button onClick={this.handleUserFollow}>FOLLOW</button>
                :
              <button onClick={this.handleUserUnfollow}>UNFOLLOW</button>
          }
        </div>
        <Switch>
          <Route exact path='/cb/profile/:id' render={this.renderAllUserRecipes} />
          <Route path='/cb/profile/:id/favorites' render={this.renderUserFavorites} />
          <Route path='/cb/profile/:id/edit' render={this.renderUserEdit} />
        </Switch>
      </div>
    )
  }
}
export default UserProfile;
