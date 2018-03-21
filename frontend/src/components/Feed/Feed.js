import React from "react"
import Searchbar from "../Search/SearchBar";
import axios from "axios";
import RecipeBox from "../SingleRecipe/RecipeBox";
import { Link } from "react-router-dom";
import "./Feed.css"

class Feed extends React.Component{
  constructor(){
    super()
  
    this.state = {
      followeedata: '',
  }
}

  componentDidMount() {
    const { username, password } = this.state;
    axios
      .get(`/users/allfollowersrecipes/3`)
      .then(res => {
        this.setState({
          message: 'success', 
          followeedata: res.data,
        });
      })
      .catch(err => {
        this.setState({
          message: `Error logging in. ${err}`
        });
      });  
  }

  render(){
    console.log('res', this.state.followeedata)
    return(
      <div>
        <Searchbar /> 
        <div className="feedContainer">
        <h2> Explore meals from your friends and family </h2> 
        <button> See your favorite recipes </button> 

        <p> {this.state.followeedata ? this.state.followeedata.map((elem) => { 
          return(<div className="feedBox">   

                    <Link to={`/user/recipe/${elem.recipe_id}`} className="feedLink">
                    <img className="feedImage" src={elem.img}/>
                    </Link> 
  </div>)
        }) : ''} </p>
        </div>
      </div>
    )
  }
}

export default Feed 
