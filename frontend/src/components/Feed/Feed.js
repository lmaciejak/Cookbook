import React from "react"
import Searchbar from "../Search/SearchBar";
import axios from "axios";
import RecipeBox from "../SingleRecipe/RecipeBox";
import { Link } from "react-router-dom";

class Feed extends React.Component{
  constructor(props){
    super(props)
  
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
        <h2> What your loved ones are cooking </h2> 
        <button> See your favorite recipes </button> 

        <p> {this.state.followeedata ? this.state.followeedata.map((elem) => { 
          return(<div>        
                    <h3>{elem.recipe_name}</h3>
                    <Link to={`/user/recipe/${elem.recipe_id}`} className="feedLink">
                    <img src={elem.img} />
                    </Link> 
                    <h4>{elem.user_id}</h4>
                    <p>favorites go here</p>  </div>)
        }) : ''} </p>
 
      </div>
    )
  }
}

export default Feed 
