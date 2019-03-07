import React from "react"
import { Link, Route, Switch } from 'react-router-dom';
import orangeHeartIcon from "../../images/orange-hearts.png";

const styles = {
  img: {
    width: "400px",
    height: "300px"
  }
}


class RecipeBox extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      recipeName: this.props.recipe.recipe_name,
      recipeImg: this.props.recipe.img,
      username: this.props.recipe.username,
      favorites: this.props.recipe.favorites_count, 
      clickable: this.props.click
    }
  }

  render(){
    // const {recipe} = this.props;
    const { recipe_name, img,
            username, favorites_count,
            recipe , recipe_id, user_id} = this.props.recipe;

    return(
      <div className="recipeBox">
        <h3>{recipe_name}</h3>
        {this.state.clickable === 'false' ?  <img src={img} className="recipeImg" alt="recipeImg" style={styles.img} />: <Link to={`/cb/${user_id}/${recipe_id}`}> <img src={img} className="recipeImg" alt="recipeImg" style={styles.img} /></Link>}
       
        <div className="recipeInfo">
        <h4>Chef {username}</h4>
        <div className="favorites" title="Favorites">
        <img
          src={orangeHeartIcon}
          className="recipeBoxFav"
        />
        <p className="fav">{favorites_count}</p> </div>
        </div>
      </div>
    )
  }
}

export default RecipeBox;
