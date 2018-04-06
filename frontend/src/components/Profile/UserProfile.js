import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import { Redirect } from 'react-router';
import axios from "axios";
import RecipeBox from "../SingleRecipe/RecipeBox";
import Recipe from "../SingleRecipe/Recipe";
import UserEdit from ".//UserEdit";
import UserFaves from "./UserFaves";
import CreateGroup from "../Modals/CreateGroup";
import "./UserProfile.css";
import Searchbar from "../Search/SearchBar";
// import AddRecipe from './SingleRecipe/AddRecipe'
import Notifications from "../Modals/Notifications";




const FollowButtons = ({ userID, profileID, canFollow, follow, unfollow }) => {
  if (userID === parseInt(profileID)) {
    return <div />;
  } else if (canFollow) {
    return (
      <button onClick={follow} className="userProfileFollowButton">
        Follow
      </button>
    );
  } else {
    return (
      <button onClick={unfollow} className="userProfileFollowButton">
        Unfollow
      </button>
    );
  }
};

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allusersRecipes: [],
      allUserRecipesUnchanged: [],
      userFollowers: [],
      userFollowing: [],
      recipeCount: "",
      user: "",
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
    };
  }

  renderSingleRecipe = () => {
    const {
      favorites_count,
      username,
      img,
      recipe_name,
      recipe,
      isvegeterian,
      isvegan,
      recipe_timestamp,
      ingredients,
      description
    } = this.state;
    return (
      <Recipe
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
    );
  };

  userInfo = () => {
    axios
      .get(`/users/getallrecentusersrecipes/${this.props.id}`)
      .then(res => {
        this.setState({
          allusersRecipes: res.data,
          allUserRecipesUnchanged: res.data
        });
      })
      .then(() => {
        axios
          .get(`/users/followers/${this.props.id}`)
          .then(res => {
            this.setState({
              userFollowers: res.data
            });
          })
          .catch(error => {
            console.log(error);
          });
      })
      .then(() => {
        axios
          .get(`/users/following/${this.props.id}`)
          .then(res => {
            this.setState({
              userFollowing: res.data
            });
          })
          .catch(error => {
            console.log(error);
          });
      })
      .then(
        axios
          .get(`/users/profile/${this.props.id}`)
          .then(res => {
            this.setState({
              user: res.data
            });
          })
          .catch(error => {
            console.log(error);
          })
      )
      .then(
        axios
          .get(`/users/getfolloweebyid/${this.props.user.user_id}/${this.props.id}`)
          .then(res =>{
            if(this.props.user.user_id === this.props.id){
              this.setState({
                canFollow: false
              });
            } else if (res.data === []) {
              this.setState({
                canFollow: true
              })
            }
            else if(res.data.find(profile => profile.follower_id === this.props.user.user_id) === undefined){
              this.setState({
                canFollow: true
              })
            }
            else {
              this.setState({
                canFollow: false
              });
            }
          })
          .catch(error => {
            console.log(error);
          })
      )
      .catch(err => {
        console.log(err);
      });
  }

  componentDidMount() {
    this.userInfo()
  }

  componentWillReceiveProps(props) {
    this.userInfo();
  }

  componentDidUpdate(prevProps,prevState){
    if(prevProps !== this.props){
      this.userInfo()
    }
  }

  handleSelectValue = e => {
    const { selectedValue, allusersRecipes } = this.state;
    this.setState({
      selectedValue: e.target.value
    })
    if (e.target.value === "mostRecent") {
      axios
        .get(`/users/getallrecentusersrecipes/${this.props.id}`)
        .then( (res) => {
          this.setState({
            allusersRecipes: res.data
          });
        })
        .catch(err => {
          console.log(err);
        });
    } else if (e.target.value === "mostTop") {
      axios
        .get(`/users/getmosttoprecipes/${this.props.id}`)
        .then( (res) => {
          console.log("mostTop: ", res);
          this.setState({
            allusersRecipes: res.data
          });
        })
        .catch(err => {
          console.log(err);
        });
    } else if (e.target.value === "favorites") {
      axios
        .get(`/users/profile/${this.props.id}/favorites`)
        .then(res => {
          this.setState({
            allusersRecipes: res.data
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  handleUserFollow = () => {
    axios
      .post("/users/followUser", {
        follower_id: this.props.user.user_id,
        followee_id: this.props.id,
        seen: false
      })
      .then(res => {
        this.setState({
          canFollow: false
        })
      })
      .catch(error => {
        console.log("Failed follow");
      });
  };

  handleUserUnfollow = () => {
    axios
      .post("/users/unfollowUser", {
        follower_id: this.props.user.user_id,
        followee_id: this.props.id
      })
      .then(res => {
        this.setState({
          canFollow: true
        });
      })
      .catch(error => {
        console.log("failed to unfollow");
      });
  };

  renderUserEdit = props => {
    const { user } = this.state
    const { id } = props.match.params;
    return <UserEdit user={user[0]} id={id}/>;
  };

  renderAllUserRecipes = () => {
    const { allusersRecipes } = this.state;
    return (
      <div className="userProfileAllRecipes">
        {allusersRecipes
          ? allusersRecipes.map(recipe => <RecipeBox recipe={recipe} key={Math.random()}/>)
          : ""}
      </div>
    );
  };

  renderUserFavorites = props => {
    const { id } = props.match.params;
    return <UserFaves id={id} />;
  };

  updateProfileImage = (e) => {
    return(
      <Redirect to={`/cb/profile/${this.props.user.user_id}/edit`} />
    )
  }

  render() {
    const { allusersRecipes, canFollow } = this.state;
    if (this.props.user && this.state.user) {
      return (
        <div>
          <Searchbar user={this.props.user} />
          <div className="userProfileContainer">
            <div className="userProfileHeading">
              <img
                src={this.state.user[0].user_img}
                className="userProfileImage"
                onClick={this.updateProfileImage}
              />
              <h1 className="userProfileName"> {this.state.user[0].username} </h1>
              <div className="userProfileFollowButtons">
                <FollowButtons
                  userID={this.props.user.user_id}
                  profileID={this.props.id}
                  canFollow={canFollow}
                  follow={this.handleUserFollow}
                  unfollow={this.handleUserUnfollow}
                />
                {this.props.user.user_id === parseInt(this.props.id) ? (
                  <CreateGroup
                    owner={this.props.user.user_id}
                    id={this.props.id}
                  />
                ) : (
                  <div />
                )}
              </div>
              <div className="userProfileFollowInfo">
              {this.state.allUserRecipesUnchanged.length ===1 ? <h4> {this.state.allUserRecipesUnchanged.length} recipe</h4> : <h4>{this.state.allUserRecipesUnchanged.length} recipes</h4>}
              {this.state.userFollowers.length === 1 ? <h4> {this.state.userFollowers.length} follower </h4> : <h4> {this.state.userFollowers.length} followers </h4>}
              <h4> {this.state.userFollowing.length} following </h4>
              </div>
            </div>
            <div className="userProfileSelectContainer">
              <p className="selectUserRecipeTagline"> See {this.state.user[0].username +"'s" }</p>
              <div className="select-style">
                <select onChange={this.handleSelectValue}>
                  <option value="mostTop">Top Recipes</option>
                  <option value="mostRecent">Recent Recipes</option>
                  <option value="favorites"> Favorite Recipes</option>
                </select>
              </div>
            </div>

            <Switch>
              <Route
                exact
                path="/cb/profile/:id"
                render={this.renderAllUserRecipes}
              />
              <Route
                path="/cb/profile/:id/favorites"
                render={this.renderUserFavorites}
              />
            </Switch>
          </div>
        </div>
      );
    } else {
      return <div>loading!</div>;
    }
  }
}
export default UserProfile;
