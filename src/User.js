import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import './style.css';


class User extends Component {
  


  render () {
    return (
    <div>
      <div className ="developer-stats">
          <h3>Developer Stats</h3>
          <h4><b> Public Repositories: </b> {this.props.info.public_repos}</h4>
          <h4><b> Owned Private Repositories: </b> {this.props.info.owned_private_repos}</h4>
          <h4><b> Public Gists: </b> {this.props.info.public_gists}</h4>
          <h4><b> Private Gists: </b> {this.props.info.private_gists}</h4>
      </div>    
      <div className = "social-stats">
          <h3>Social Stats </h3>
          <h4><b>Followers: </b>{this.props.info.followers}</h4>
          <h4><b>Following: </b>{this.props.info.following}</h4>
          <h4><b>Collaborators: </b>{this.props.info.collaborators}</h4>
      </div>
    </div>
    )
  }
}

export default User;

