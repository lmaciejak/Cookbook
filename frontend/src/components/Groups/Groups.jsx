import React from 'react'
import { Route, Switch } from 'react-router-dom'
import axios from 'axios'

import AllGroups from './AllGroups'
import SingleGroup from './SingleGroup'
import GroupMembers from './GroupMembers'
import GroupRecipes from './GroupRecipes'
import Searchbar from "../Search/SearchBar";
import './Groups.css'

class Groups extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      groups: [],
      user: ''
    }
  }

  fetchAllGroups = () =>{
    axios
      .get('/users/allgroups')
      .then(res => {
        this.setState({
          groups: res.data
        })
      })
      .then(
        axios
          .get('/users')
          .then(res => {
            this.setState({
              user: res.data[0]
            })
          })
      )
      .catch(error => {
        console.log('failed to get all groups')
      })
  }

  componentDidMount(){
    this.fetchAllGroups()
  }

  componentWillReceiveProps(props) {
    this.fetchAllGroups();
  }

  renderAllGroups = () =>{
    const { groups } = this.state
    return(
      <AllGroups user={this.props.user} groups={groups} />
    )
  }

  renderSingleGroup = props =>{
    const { groupID } = props.match.params
    const { user } = this.state
    return(
      <SingleGroup user={user} groupID={groupID} />
    )
  }

  renderGroupMembers = props =>{
    const { groupID } = props.match.params
    const { user } = this.state
    return(
      <GroupMembers user={user} groupID={groupID} />
    )
  }

  renderGroupRecipes = props =>{
    const { groupID } = props.match.params
    const { user } = this.state
    return(
      <GroupRecipes user={user} groupID={groupID} />
    )
  }


  render(){
    return(
      <div>
        {this.props.user ?  <Searchbar user={this.props.user} /> : <div></div>}
        <Switch>
          <Route exact path='/cb/groups' render={this.renderAllGroups} />
          <Route exact path='/cb/groups/:groupID/members' render={this.renderGroupMembers} />
          <Route exact path='/cb/groups/:groupID/recipes' render={this.renderGroupRecipes} />
          <Route path='/cb/groups/:groupID' render={this.renderSingleGroup} />
        </Switch>
      </div>
    )
  }
}

export default Groups
