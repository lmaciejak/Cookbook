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

  getFavRecipes = () =>{
    const { favoriteRecipes } = this.state
    axios.get(`/users/profile/${this.props.user.user_id}/favorites`)
    .then(response =>{
      this.setState({
        favoriteRecipes: response.data
      })
    })
    .catch(error =>{
      console.log('fire')
    })
  }

  componentDidUpdate(prevProps, prevState){
    if(prevProps.user.data !== this.props.user.data){
      this.getFavRecipes()
    }
  }


  render(){
    console.log(this.props.user.username)
    const { favoriteRecipes } = this.state
    if(this.props.user){
      return(
        <div>
          <h2>Your Favorite Recipes</h2>
          <div>
            {favoriteRecipes.map(recipe =>(
              <RecipeBox recipe={recipe} user={this.props.user} favorites={recipe.favorites}/>
            ))}
          </div>
        </div>
      )
    }
    else {
      return(
        <div>loading</div>
      )
    }
  }
}

export default UserFaves
