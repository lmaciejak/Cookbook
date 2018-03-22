import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import axios from "axios";
import RecipeBox from "../SingleRecipe/RecipeBox";
import Recipe from "../SingleRecipe/Recipe";
import UserEdit from "../Profile/UserEdit";

class UserProfile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      allusersRecipes: [],
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
			.get(`/users/allrecipes/${this.props.user}`)
      .then( (res) => {
        this.setState({
          allusersRecipes: res.data
        })
      })
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

  render() {
    const { allusersRecipes } = this.state;

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
        {allusersRecipes.map( (recipe) => {
          return  <RecipeBox recipe={recipe} />
        })}
        <Switch>
          <Route path="/cb/profile/:id/edit" component={UserEdit}/>
        </Switch>
      </div>
    )
  }
}
export default UserProfile;
