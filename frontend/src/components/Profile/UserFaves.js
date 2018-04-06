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
    axios.get(`/users/profile/${this.props.id}/favorites`)
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
    if(prevProps !== this.props){
      this.getFavRecipes()
    }
  }


  render(){
    const { favoriteRecipes } = this.state
    if(this.props){
      return(
        <div>
            {favoriteRecipes.map(recipe =>(
              <RecipeBox recipe={recipe} key={Math.random()} />
            ))}
        </div>
      )
    }
    else {
      return(
        <div>loading!</div>
      )
    }
  }
}

export default UserFaves
