import React from "react";
import Searchbar from "../Search/SearchBar";
import axios from "axios";
import RecipeBox from "../SingleRecipe/RecipeBox";
import { Link } from "react-router-dom";
import "./Feed.css";
import cheficon from "../../images/cheficon.png";
import hearticon from "../../images/hearticon.png";
import orangeHeartIcon from "../../images/orange-hearts.png";

class Feed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      followeedata: ""
    };
  }

  componentDidMount() {
    const { username, password } = this.state;
    axios
      .get(`/users/allfollowersrecipes/${this.props.user.user_id}`)
      .then(res => {
        this.setState({
          message: "success",
          followeedata: res.data
        });
      })
      .catch(err => {
        this.setState({
          message: `Error logging in. ${err}`
        });
      });
  }


  render() {
    return (
      <div>
        <Searchbar user={this.props.user} />
        <div className="feedContainer">
          <h2 className="feedHead"> Explore meals your friends and family are cooking</h2>

          <div className="feedBoxContainer">
            {" "}
            {this.state.followeedata
              ? this.state.followeedata.map(elem => {
                  return (
                    <div className="feedBox" key={Math.random()}>
                      <div className="feedBoxDescription">
                        <h4 className="feedRecipeName"> {elem.recipe_name} </h4>
                        <div className="feedRecipeIcons">
                          <img
                            src={orangeHeartIcon}
                            className="feedRecipeChefIcon"
                          />
                          <p className="feedRecipeFavorites">
                            {" "}
                            {elem.favorites_count}{" "}
                          </p>
                        </div>
                      </div>
                      <Link
                        to={`/cb/${elem.username}/${elem.recipe_id}`}
                        className="feedLink"
                      >
                        <img className="feedImage" src={elem.img} />
                      </Link>
                      <div className="feedBoxFooter">
                      <Link
                            to={`/cb/profile/${elem.user_id}`}
                            className="singleRecipeUsernameLink"
                          >
                            <img
                              src="https://cdn0.iconfinder.com/data/icons/kitchen-and-cooking/512/salting_cooking_hand_sprinkle_salt_flat_design_icon-256.png"
                              className="feedRecipeChefIcon"
                            />
                            <p className="feedRecipeUsername">
                              {" "}
                              {elem.username}{" "}
                            </p>
                          </Link>
                      </div>  
                    </div>
                  );
                })
              : ""}{" "}
          </div>
        </div>
      </div>
    );
  }
}

export default Feed;
