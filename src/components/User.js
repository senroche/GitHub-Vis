import React, { Component } from 'react';
import '../style/style.css';
import Pie from './Pie.js'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DonutChart from './Pie' ;

class User extends Component {
  
  
  render () {
    return (
    <div>
      
      <div className ="developer-stats">
          <h3>Developer Stats</h3>
        <div classname = "stat-box">
            <h6> Public Repositories: <b>{this.props.info.public_repos}</b></h6>
            <h6> Owned Private Repositories: <b> {this.props.info.owned_private_repos}</b></h6>
            <h6> Public Gists: <b> {this.props.info.public_gists}</b></h6>
            <h6> Private Gists: <b> {this.props.info.private_gists}</b></h6>
        </div>   
      </div> 
      <div className = "social-stats">
        <div classname = "stat-box">
            <h3>Social Stats </h3>
            <h6> Followers: <b>{this.props.info.followers}</b></h6>
            <h6> Following: <b>{this.props.info.following}</b></h6>
            <h6> Collaborators: <b>{this.props.info.collaborators}</b></h6>

        </div>
      </div>
      <div className = "pie">
      
      <div>
                <h3>Language Stats</h3>
                <div className="section">
                    <Pie data = {this.props.stats} width="500" height="300" id="bs_chart" padAngle={0.03}/>
                </div>
            </div>
      </div>
      </div>
      
    )
  
}
}

export default User;

