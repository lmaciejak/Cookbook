import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
let styles = {height: "200px", width: "200px"};

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
      canFavorite: true,
      comment: "",
      comments_id: false
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

    axios
      .get(`/users/singlerecipe/${this.props.user.recipeID}`)
      .then( (res) => {
        this.setState({
          favorites_count: res.data[0].favorites_count,
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

    axios
      .get(`/users/singlerecipe/${this.props.user.recipeID}`)
      .then( (res) => {
        this.setState({
          favorites_count: res.data[0].favorites_count,
        })
      })
      .catch( (err) => {
        console.log(err);
      })
  }

  handleInputComment = (e) => {
    this.setState({
      comment: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.comments_id) {
      axios
        .patch(`/users/editComment/${this.state.comments_id}`, {
          recipe_id: this.props.user.recipeID,
          comment: this.state.comment,
        })
        .then( (res) => {
          axios
            .get(`/users/comment/${this.props.user.recipeID}`)
            .then( (res) => {
              this.setState({
                comments: res.data,
                comment: ""
              })
            })
            .catch( (error) => {
              console.log(error);
            })
          this.setState({
            comments_id: false,
            comment: ""
          })
        })
        .catch( (err) => {
          console.log(err);
        })
    } else {
      axios
        .post("/users/addComment", {
          recipe_id: this.props.user.recipeID,
          comment: this.state.comment
        })
        .then( (res) => {
          axios
            .get(`/users/comment/${this.props.user.recipeID}`)
            .then( (res) => {
              this.setState({
                comments: res.data,
                comment: ""
              })
            })
            .catch( (error) => {
              console.log(error);
            })
        })
        .catch( (err) => {
          console.log(err);
        })
    }
  }

  handleClickEdit = (e) => {
    axios
      .get(`/users/getsinglecomment/${e.target.id}`)
      .then( (res) => {
        this.setState({
          comment: res.data[0].comment,
          comments_id: res.data[0].comments_id
        })
      })
      .catch( (err) => {
        console.log(err);
      })
  }

  render() {
    const { favorites_count, username,
            recipe_name, recipe, img,
            isvegeterian, isvegan,
            ingredients, comments, canFavorite,
            comment } = this.state;
    if(this.props.user){
      return (
        <div>
          <h1>Name {recipe_name}</h1>
          <img src={img} alt="recipe_image" style={styles} />
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
          <form onSubmit={this.handleSubmit}>
            <textarea
              placeholder="leave your comment"
              onInput={this.handleInputComment}
              value={comment}
            />
            <button>Submit</button>
          </form>
          <ul type="none">Comments
            {
              comments? comments.map(comment => (
                <li key={Math.random()}>{comment.fullname}{": "}{comment.comment}{" "}
                {comment.user_id === this.props.id?
                  <button
                    onClick={this.handleClickEdit}
                    id={comment.comments_id}>
                    edit/delete
                  </button>: ""
                  /*<button
                    onClick={this.handleClickReport}
                    id={comment.comments_id}>
                    report abuse
                  </button> */}
                </li>
              )) : "There are no any comments"
            }
          </ul>
          <Link to={`/`}>Back</Link>
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
