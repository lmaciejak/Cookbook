import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import RecipeBox from '../SingleRecipe/RecipeBox'

class GroupRecipes extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      group: '',
      recipes: []
    }
  }

  getGroup = () =>{
    const { group } = this.state
    axios
      .get(`/users/getSingleGroup/${this.props.groupID}`)
      .then(res => {
        this.setState({ group: res.data[0] })
      })
      .catch(error => {
        console.log('error getting a group')
      })
  }

  getGroupRecipes = () =>{
    const { recipes } = this.state
    axios
      .get(`/users/allgrouprecipes/${this.props.groupID}`)
      .then(res => {
        this.setState({ recipes: res.data })
      })
      .catch(error => {
        console.log('error getting group recipes')
      })
  }

  componentDidMount(){
    this.getGroup()
    this.getGroupRecipes()
  }

  render(){
    const { group, recipes } = this.state
    return(
      <div>
        <h1>Recipes for {group.group_name}</h1>
        <div>
          {recipes.map(recipe => (
            <RecipeBox recipe={recipe} key={Math.random()} />
          ))}
        </div>
      </div>
    )
  }
}

export default GroupRecipes
