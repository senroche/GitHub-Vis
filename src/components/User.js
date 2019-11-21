import React, { Component } from 'react';
import Pie from './Pie.js'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../style/style.css';

class User extends Component {
  
  
  render () {
    return (
    <div>
      
      <div className ="quick-stats">
          <h3 style ={{paddingBottom: "6px"}}>Quick Stats</h3>
        <div classname = "stat-box">
          
          <h6 style ={{paddingBottom:"6px"}}><b>General</b></h6>
          <h6> Public Repositories: <b>{this.props.info.public_repos}</b></h6>
          <h6> Owned Private Repositories: <b> {this.props.info.owned_private_repos}</b></h6>
          <h6> Public Gists: <b> {this.props.info.public_gists}</b></h6>
          <h6> Private Gists: <b> {this.props.info.private_gists}</b></h6>

          <h6 style ={{paddingBottom:"6px", paddingTop:"6px"}}><b>Social</b></h6>
          <h6> Followers: <b>{this.props.info.followers}</b></h6>
          <h6> Following: <b>{this.props.info.following}</b></h6>
          <h6> Collaborators: <b>{this.props.info.collaborators}</b></h6>
        </div>   
      </div>

      <div className = "languageTile">
      <div>
                <h3>Language Stats</h3>
                
                    <Pie data = {this.props.stats} width="500" height="300" id="bs_chart" padAngle={0.03}/>
            </div>
      </div>
      </div>
      
    )
  
}
}

export default User;

