import React, { Component } from 'react';
import Pie from './Pie.js'
import Row from 'react-bootstrap/Row';
import Fade from 'react-reveal/Fade';
import Flip from 'react-reveal/Flip';
import '../style/style.css';
import CreatePunchCard from './PunchCard.js';

class User extends Component {
  constructor(props){
    super(props);
  }

  render () {
    {console.log('Its not here', this.props.punch)}
    return (
    <div>
      <Row>
      <Flip left>
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
        </Flip>
        <Fade right>
        <div className = "language-tile">
          <h3>Language Stats</h3>
          <div className = "pie-container">
            <Pie data = {this.props.stats} width="500" height="300" id="language-graph" padAngle={0.03}/>
          </div>
        </div>
        </Fade>
      </Row>

      <Row>
      <Fade>
      <div className = "commit-tile">
        <h3>Punch Card Stats</h3>
        <div className = "punch-container">
          <CreatePunchCard data={this.props.punch}/>
        </div>
      </div>
      </Fade>
      </Row> 
      </div>
    )
  }

}

export default User;

