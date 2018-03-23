import React from "react";
import axios from "axios";
import RecipeBox from "../SingleRecipe/RecipeBox"
import LoginUser from "../Modals/LoginUser"
import RegisterUser from "../Modals/RegisterUser";

class Home extends React.Component {

  constructor() {
    super();
    this.state = {
      favorites: []
    }
  }

  componentDidMount() {
    axios
      .get("/users/sortedrecipes")
      .then(res => {
        this.setState({
          favorites: res.data
        })
			})
			.catch(err => {
        console.log(err);
			})
  }

  render() {
    const { favorites } = this.state;
    console.log(favorites)
      return (
        <div className="landingPage">
          <div className="landingPhoto">
            <div className="header">
              <div></div>
              <h1>Welcome to CookBook </h1>
              <div className="landButton">
              <LoginUser className="button" /> 
              <RegisterUser className="button" /></div>
          </div>
          </div>

          <div>
              <h2 className="landingPageHeader">Best Recipes on Cookbook</h2>
          </div>

          <div className="landingPageFeatured">
              {favorites.map( (recipe) => {
                  return  <RecipeBox recipe={recipe} />
              })}
          </div>
        </div>
      )
  }
}

export default Home;
