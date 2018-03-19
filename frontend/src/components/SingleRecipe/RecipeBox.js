import React from "react"

const styles = {
  img: {
    width: "400px",
    height: "400px"
  }
}


class RecipeBox extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      recipe: this.props.recipe.recipe_name,
      recipeImg: this.props.recipe.img,
      user: this.props.user,
      favorites: this.props.favorites
    }
  }

  render(){
    const { recipe, recipeImg, user, favorites } = this.state
    return(
      <div>
        <h3>{recipe}</h3>
        <img src={recipeImg} style={styles.img} />
        <h4>{user.username}</h4>
        <p>{favorites}</p>
      </div>
    )
  }
}

export default RecipeBox
