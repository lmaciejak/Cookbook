import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Searchbar from "../Search/SearchBar";
import hearticon from "../../images/orange-hearts.png";
import veganicon from "../../images/vegan3.png";
import vegetarianicon from "../../images/vegetarian3.png";
import cheficon from "../../images/chefhat.png";
import "./Recipe.css";
// let styles = {height: "200px", width: "200px"};

class SingleRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites_count: "",
      username: "",
      user_id: "",
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
    };
  }

  componentDidMount() { 
    this.loadsRecipe();
  }

  componentWillReceiveProps(props) { 
    console.log("--=-=-=-=-=-")
    console.log("new props: ", props)
    this.loadsRecipe(); 
  }
  loadsRecipe = () => {
    console.log("loading recipe")
    axios
      .get(`/users/isfavorite/${this.props.user.recipeID}`)
      .then(res => {
        console.log("got recipe")
        if (res.data.length === 0) {
          this.setState({
            canFavorite: false
          });
        } else {
          this.setState({
            canFavorite: true
          });
        }
      })
      .then(() => { 
        axios
        .get(`/users/singlerecipe/${this.props.user.recipeID}`)
        .then(res => {
          this.setState({
            favorites_count: res.data[0].favorites_count,
            username: res.data[0].username,
            user_id: res.data[0].user_id,
            recipe_name: res.data[0].recipe_name,
            recipe: res.data[0].recipe,
            img: res.data[0].img,
            isvegeterian: res.data[0].isvegeterian,
            isvegan: res.data[0].isvegan
          });
        })
      })
      .then(() => { 
        axios
        .get(`/users/getingredients/${this.props.user.recipeID}`)
        .then(res => {
          this.setState({
            ingredients: res.data
          });
        })
      })
      .then(() => { 
        axios
        .get(`/users/comment/${this.props.user.recipeID}`)
        .then(res => {
          this.setState({
            comments: res.data
          });
        })
      })
      .catch(error => {
        console.log(error);
      });
    }


  handleClickLike = e => {
    e.preventDefault();

    axios
      .post("/users/favorite", {
        recipe_id: this.props.user.recipeID
      })
      .then(() => {
        this.setState({
          canFavorite: true
        });
      })
      .then(() =>
        axios
          .get(`/users/singlerecipe/${this.props.user.recipeID}`)
          .then(res => {
            this.setState({
              favorites_count: res.data[0].favorites_count
            });
          })
      )
      .catch(err => {
        console.log(err);
      });
  };

  handleClickDisLike = e => {
    e.preventDefault();

    axios
      .post(`/users/unfavorite`, {
        recipe_id: this.props.user.recipeID
      })
      .then(() => {
        this.setState({
          canFavorite: false
        });
      })
      .then(() =>
        axios
          .get(`/users/singlerecipe/${this.props.user.recipeID}`)
          .then(res => {
            this.setState({
              favorites_count: res.data[0].favorites_count
            });
          })
      )
      .catch(err => {
        console.log(err);
      });
  };

  handleInputComment = e => {
    this.setState({
      comment: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.comments_id) {
      axios
        .patch(`/users/editComment/${this.state.comments_id}`, {
          recipe_id: this.props.user.recipeID,
          comment: this.state.comment
        })
        .then(res => {
          axios
            .get(`/users/comment/${this.props.user.recipeID}`)
            .then(res => {
              this.setState({
                comments: res.data,
                comment: ""
              });
            })
            .catch(error => {
              console.log(error);
            });
          this.setState({
            comments_id: false,
            comment: ""
          });
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      axios
        .post("/users/addComment", {
          recipe_id: this.props.user.recipeID,
          comment: this.state.comment
        })
        .then(res => {
          axios
            .get(`/users/comment/${this.props.user.recipeID}`)
            .then(res => {
              this.setState({
                comments: res.data,
                comment: ""
              });
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  handleClickEdit = e => {
    axios
      .get(`/users/getsinglecomment/${e.target.id}`)
      .then(res => {
        this.setState({
          comment: res.data[0].comment,
          comments_id: res.data[0].comments_id
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    // console.log("canfavorite", this.state.canFavorite);
    // console.log("favorites count", this.state.favorites_count);
    // console.log("isvegan", this.state.isvegan);
    // console.log("comments", this.state.comments);
    console.log("recipe render")
    console.log("render props: ", this.props)
    const {
      favorites_count,
      username,
      user_id,
      recipe_name,
      recipe,
      img,
      isvegeterian,
      isvegan,
      ingredients,
      comments,
      canFavorite,
      comment
    } = this.state;

    if (this.props.user) {
      return (
        <div>
          <Searchbar />
          <div className="singleRecipeContainer">
            <div className="singleRecipeIntroLine">
              <h1 className="singleRecipeHeader"> {recipe_name} </h1>
              {isvegan ? (
                <img src={veganicon} className="singleRecipeVeganIcon" />
              ) : (
                ""
              )}
              {isvegeterian && !isvegan ? (
                <img src={vegetarianicon} className="singleRecipeVeganIcon" />
              ) : (
                ""
              )}
              {!canFavorite ? (
                <img
                  onClick={this.handleClickLike}
                  src={hearticon}
                  title="Favorite"
                  className="heartIconFavorite"
                />
              ) : (
                <img
                  onClick={this.handleClickDisLike}
                  src={hearticon}
                  className="heartIconUnfavorite"
                />
              )}
              <p className="recipeFavoritesCount">
                {" "}
                {this.state.favorites_count}
              </p>
              <div>
              <Link to={`/cb/profile/${user_id}`} className="singleRecipeUsernameLink">
              <img className="singleRecipeChefIcon" src="https://cdn0.iconfinder.com/data/icons/kitchen-and-cooking/512/salting_cooking_hand_sprinkle_salt_flat_design_icon-256.png" />
                <h3 className="singleRecipeUsername"> {username} </h3>{" "}
              </Link>
              </div>
            </div>
            <div className="singleRecipeRight">
              <img src={img} alt="recipe_image" className="singleRecipeImage" />
            </div>
            <div className="singleRecipeLeft">
              <h3 className="singleRecipeIngredientsTitle"> Ingredients </h3>
              <ul type="none">
                {ingredients
                  ? ingredients.map(ingredient => (
                      <li className="ingredientList" key={Math.random()}>
                        {ingredient.amount} {ingredient.name}
                      </li>
                    ))
                  : "There are no any ingredients"}
              </ul>
              <h3 className="singleRecipeIngredientsTitle">Directions</h3>
              <p> {recipe}</p>

              <h3 className="singleRecipeIngredientsTitle">
                {" "}
                Leave a comment{" "}
              </h3>
              <form onSubmit={this.handleSubmit}>
                <textarea
                  placeholder="leave your comment"
                  onInput={this.handleInputComment}
                  value={comment}
                />
                <button className="singleRecipeSubmit">Submit</button>
              </form>
              <h3 className="singleRecipeIngredientsTitle"> Comments </h3>
              <ul className="commentList" type="none">
                {comments
                  ? comments.map(comment => (
                      <li key={Math.random()}>
                        <strong>{comment.username}</strong>
                        {": "}
                        {comment.comment}{" "}
                        {comment.user_id === this.props.id ? (
                          <button
                            onClick={this.handleClickEdit}
                            id={comment.comments_id}
                            className="singleRecipeCommentEdit"
                          >
                            edit/delete
                          </button>
                        ) : (
                          ""
                        )
                        /*<button
                    onClick={this.handleClickReport}
                    id={comment.comments_id}>
                    report abuse
                  </button> */
                        }
                      </li>
                    ))
                  : "There are no any comments"}
              </ul>
            </div>
          </div>
        </div>
      );
    } else {
      return <div>loading feed</div>;
    }
  }
}
export default SingleRecipe;


// <img src={cheficon} className="singleRecipeChefIcon"/>