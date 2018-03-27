import React from 'react'
import { Route, Switch } from 'react-router-dom'
import axios from 'axios'

import AllGroups from './AllGroups'
import SingleGroup from './SingleGroup'

class Groups extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      groups: [],
      user: ''
    }
  }

  componentDidMount(){
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

  render(){
    console.log('Black',this.state)
    return(
      <div>
        <Switch>
          <Route exact path='/cb/groups' render={this.renderAllGroups} />
          <Route path='/cb/groups/:groupID' render={this.renderSingleGroup} />
        </Switch>
      </div>
    )
  }
}

export default Groups
