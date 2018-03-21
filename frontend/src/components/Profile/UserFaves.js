import React from "react"
import axios from 'axios'

import RecipeBox from '../SingleRecipe/RecipeBox'

class UserFaves extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      favoriteRecipes: []
    }
  }

  getFavoriteRecipes = (id) =>{
    const { favoriteRecipes } = this.state

    let favesArray = []

    axios.get(`/users/profile/${id}/favorites`)
    .then(response =>{
      favesArray = response.data
      this.setState({
        favoriteRecipes: favesArray
      })
    })
    .catch(error =>{
      console.log(error)
    })
  }

  render(){
    const { favoriteRecipes } = this.state
    if(this.props.user){
      this.getFavoriteRecipes(this.props.user.user_id)
      if(favoriteRecipes.length < 1){
        <div>
          <h2>Your Favorite Recipes</h2>
          <p>No Favorites Yet</p>
        </div>
      } else{
        return(
          <div>
            <h2>Your Favorite Recipes</h2>
            {favoriteRecipes.map(recipe =>(
              <RecipeBox recipe={recipe} />
            ))}
          </div>
        )
      }
    }
    else{
      return(
        <div>Loading Loading</div>
      )
    }
  }
}

export default UserFaves
