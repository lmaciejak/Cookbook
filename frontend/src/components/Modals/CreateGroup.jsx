import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import axios from "axios"

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width                 : '25%',
    textAlign             : 'center'
  }
};

Modal.setAppElement('#root')

class CreateGroup extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      group_name: '',
      group_description: '',
      message: '',
      modalIsOpen: false
    }
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false, message: ''});
  }

  handleInput = event =>{
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  createGroup = () =>{
    const { group_name, group_description } = this.state

    if(group_name.length < 4){
      this.setState({
        group_name: '',
        group_description: '',
        message: 'Group name must be at least 4 characters',
      })
    }
    else {
      axios
        .post('/users/createGroup',{
          user_id: this.props.id,
          group_name: group_name,
          group_description: group_description
        })
        .then(res => {
          this.setState({
            group_name: '',
            group_description: '',
            message: 'Group created',
          })
          axios
            .post('/users/joinGroup',{
              user_id: this.props.owner,
              group_id: res.data.group_id
            })
            .then(res => {
              this.closeModal()
            })
        })
        .catch(error => {
          console.log('failure to insert owner as follower')
        })
    }
  }

  render(){
    const { group_name, group_description, message } = this.state

    return(
      <div>
        <button onClick={this.openModal}>Create Group</button>
          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            style={customStyles}
          >
          <button onClick={this.closeModal}>x</button>
          <h1>Create Group</h1>
          <input
            name='group_name'
            placeholder='Group Name'
            value={group_name}
            type='text'
            onInput={this.handleInput}
            />
            <input
              name='group_description'
              placeholder='Group Description/Purpose'
              value={group_description}
              type='text'
              onInput={this.handleInput}
              />
            <button onClick={this.createGroup}>Submit</button>
            {message}
        </Modal>
      </div>
    )
  }
}

export default CreateGroup
