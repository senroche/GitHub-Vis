import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import User from './User.js';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { FaUserAlt, FaJava } from 'react-icons/fa';
import { GoRepo } from 'react-icons/go';
import '../style/style.css';

class Dashboard extends Component {
    constructor (props) {
      super(props);
      this.state = {
        route: 1,
      };
    }


  render () {
    let mainPanel;
    //Show user info
    if (this.state.route===1) {
      mainPanel=<User info = {this.props.info} stats={this.props.lang}/>;
    //Show repo info (incomplete)
    } else if (this.state.route===2) {
      mainPanel= <h3>Repo page</h3>
    }
    //Landing (incomplete)
    else{
      mainPanel=<h3>Hi {this.props.info.login}. Click an item to start</h3>
    }
    //if(this.props.langStats){
    return (
    <Container fluid style = {{margin: 0 }}>
        <div className = "notification"> You are logged in as {this.props.info.login}</div>
        <Row>
            <Col style={{color: "white", background:"#111", height:"100vh", padding:"0px"}} sm={4} md={2}>
            <Button variant="menu" onClick={(e) => this.setState({route:1})} > <FaUserAlt /> User </Button>
            <Button variant="menu" onClick={(e) => this.setState({route:2})} > <GoRepo /> Repositories</Button>
            <div className = "profile-container">
                <img className= "gravatar" src={this.props.info.avatar_url} alt="Avatar"/>
                <h3>{this.props.info.name}</h3>
                <h3>{this.props.info.login}</h3>
                <div className ="bio">
                    {this.props.info.bio}
                </div>
            </div>
            </Col>
            <Col md={10} style = {{padding:"0px"}}>

              <User info = {this.props.info} stats={this.props.lang}/>
            </Col>
        </Row>
    </Container> 
    
    )
    }
  }


export default Dashboard;