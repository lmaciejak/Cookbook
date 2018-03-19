import React from "react";
import axios from "axios";

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
    return (
      <div className="landingPage">
        <div className="landingPhoto">
          <div className="header">
            <h1>Welcome to CookBook </h1>
            <div className="landButton"><a className="button"> Login </a> <a className="button"> Sign Up </a>  </div>
            </div>
        </div>
        <div>
          <ul type="none">
            {favorites.map( (recipe) => {
                return <div>
                  <li><img src={`${recipe.img}`} alt="foodimages" /></li>
                  <li>favorites {recipe.favorites_count}</li>
                  <li>username {recipe.username}</li>
                  <li>{recipe.recipe_name}</li>
                  <li>{recipe.recipe}</li>
                </div>
            })}
          </ul>
        </div>
      </div>
    )
  }
}

export default Home;
