import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class SingleRecipe extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      favorites_count: "",
      username: "",
      recipe_name: "",
      recipe: "",
      img: "",
      isvegeterian: "",
      isvegan: "",
      comments: "",
      ingredients: [],
      canFavorite: true
    }
  }

  componentDidMount() {
    axios
      .get(`/users/isfavorite/${this.props.user.recipeID}`)
      .then( (res) => {
        if (res.data.length === 0) {
          this.setState({
            canFavorite: false
          })
        } else {
          this.setState({
            canFavorite: true
          })
        }

      })
      .catch( (error) => {
        console.log(error);
      })
    axios
      .get(`/users/singlerecipe/${this.props.user.recipeID}`)
      .then( (res) => {
        this.setState({
          favorites_count: res.data[0].favorites_count,
          username: res.data[0].username,
          recipe_name: res.data[0].recipe_name,
          recipe: res.data[0].recipe,
          img: res.data[0].img,
          isvegeterian: res.data[0].isvegeterian,
          isvegan: res.data[0].isvegan
        })
      })
      .catch( (err) => {
        console.log(err);
      })
    axios
      .get(`/users/getingredients/${this.props.user.recipeID}`)
      .then( (res) => {
        this.setState({
          ingredients: res.data
        })
      })
      .catch( (error) => {
        console.log(error);
      })
    axios
      .get(`/users/comment/${this.props.user.recipeID}`)
      .then( (res) => {
        this.setState({
          comments: res.data
        })
      })
      .catch( (error) => {
        console.log(error);
      })
  }

  handleClickLike = (e) => {
    e.preventDefault();
    axios
      .post("/users/favorite", {
        recipe_id: this.props.user.recipeID,
      })
      .then( () => {
        this.setState({
          canFavorite: true
        })
      })
      .catch( (err) => {
        console.log(err);
      })
  }

  handleClickDisLike = (e) => {
    e.preventDefault();
    axios
      .post(`/users/unfavorite`, {
        recipe_id: this.props.user.recipeID,
      })
      .then( () => {
        this.setState({
          canFavorite: false
        })
      })
      .catch( (err) => {
        console.log(err);
      })
  }

  render() {
    console.log("test: ", this.state.canFavorite)
    const { favorites_count, username,
            recipe_name, recipe, img,
            isvegeterian, isvegan,
            ingredients, comments, canFavorite } = this.state;
    if(this.props.user){
      return (
        <div>
          <h1>Name {recipe_name}</h1>
          <img src={img} alt="recipe_image" />
          { !canFavorite?<button onClick={this.handleClickLike}>like</button> : <button onClick={this.handleClickDisLike}>dislike</button>}
          <p>Direction {recipe}</p>
          <ul type="none">Ingredient
            {
              ingredients ? ingredients.map(ingredient => (
                 <li key={Math.random()}>{ingredient.amount}{" "}{ingredient.name}</li>
              )) : "There are no any ingredients"
            }
          </ul>
          <h6>Chef {username}</h6>
          <p>
            Vegeterian {isvegeterian}{" "}
            Vegan {isvegan}{" "}
            Favorites {favorites_count}{" "}
          </p>
          <ul type="none">Comments
            {
              comments? comments.map(comment => (
                 <li key={Math.random()}>{comment.comment}</li>
              )) : "There are no any comments"
            }
          </ul>
          <Link to={`/cb/profile/${this.props.user.username}`}>Back</Link>
        </div>
      )
    }
    else {
      return(
        <div>loading feed</div>
      )
    }
  }
}
export default SingleRecipe;
