import React from "react"
import Searchbar from "../Search/SearchBar";
import axios from "axios";
import RecipeBox from "../SingleRecipe/RecipeBox";
import { Link } from "react-router-dom";
import "./Feed.css"
import cheficon from '../Search/cheficon.png'
import hearticon from '../Search/hearticon.png'

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
    console.log('followeedata', this.state.followeedata)
    return(
      <div>
        <Searchbar /> 
        <div className="feedContainer">
        <h2> Explore meals your friends and family are cooking</h2> 

        <div className="feedBoxContainer"> {this.state.followeedata ? this.state.followeedata.map((elem) => { 
          return(<div className="feedBox"> 
                  <div className="feedBoxDescription">  
                    <h4 className="feedRecipeName"> {elem.recipe_name} </h4>
                    <div className="feedRecipeIcons">
                    <img src="https://cdn0.iconfinder.com/data/icons/kitchen-and-cooking/512/salting_cooking_hand_sprinkle_salt_flat_design_icon-256.png" className="feedRecipeChefIcon"/>
                    <p className="feedRecipeUsername"> {elem.username} </p>
                    <img src="http://www.iconsplace.com/download/orange-hearts-512.gif" className="feedRecipeChefIcon"/>
                    <p className="feedRecipeFavorites"> {elem.favorites_count} </p>
                    </div>
                    </div>
                    <Link to={`/user/recipe/${elem.recipe_id}`} className="feedLink">
                    <img className="feedImage" src={elem.img}/>
                    </Link> 
  </div>)
        }) : ''} </div>
        </div>
      </div>
    )
  }
}

export default Feed 



// favorites_count
// :
// "2"
// img
// :
// "https://d1alt1wkdk73qo.cloudfront.net/images/guide/01751a3e8de64ce289286aa8b75e4bfe/640x478_ac.jpg"
// isvegan
// :
// false
// isvegeterian
// :
// false
// recipe
// :
// "Fry the calamari"
// recipe_id
// :
// 2
// recipe_name
// :
// "Fried Calamari"
// recipe_timestamp
// :
// "2018-03-21T17:10:42.230Z"
// user_id
// :
// 1
// username
// :
// "test"
