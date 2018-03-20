import React from "react"

const styles = {
  img: {
    width: "300px",
    height: "300px"
  }
}


class RecipeBox extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      recipeName: this.props.recipe.recipe_name,
      recipeImg: this.props.recipe.img,
      user: this.props.recipe.username,
      favorites: this.props.recipe.favorites_count
    }
  }

  render(){
    const { recipeName, recipeImg, user, favorites, recipe } = this.state
    return(
      <div className="recipeBox">
        <h3>{recipeName}</h3>
        <img src={recipeImg} alt="recipeImg" style={styles.img} />
        <div className="recipeInfo">
        <h4>Chef {user}</h4>
        <div className="favorites"> <i class="fas fa-file-alt"></i> <p>{favorites}</p> </div>
        </div>
      </div>
    )
  }
}

export default RecipeBox
