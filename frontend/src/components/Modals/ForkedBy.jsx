import React from 'react'
import { Link } from 'react-router-dom'
import Modal from 'react-modal'

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root')

class ForkedBy extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      modalIsOpen: false
    }

    this.openModal = this.openModal.bind(this);
    this.closeModalLogin = this.closeModalLogin.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModalLogin() {
    this.setState({modalIsOpen: false});
  }


  render(){
    return(
      <div className='Modal'>
        <div>
          {this.props.forks !== [] ? <button className="forkByButton" onClick={this.openModal}>Forked By</button> : ""}
          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModalLogin}
            style={customStyles}
          >
          <button className="xButton" onClick={this.closeModalLogin}>x</button>
          <h2>This Recipe has been forked by</h2>
          <ul>
            {this.props.forks.map(fork => {
              let path = `/cb/${fork.user_id}/${fork.recipe_id}`
              return(
                <p>{fork.username} : <Link to={path} onClick={this.closeModalLogin}>Their Fork</Link></p>
              )
            })}
          </ul>
        </Modal>
        </div>
      </div>
    )
  }
}

export default ForkedBy
