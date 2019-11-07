import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { FaTrophy } from 'react-icons/fa';
import { FaUserAlt } from 'react-icons/fa';
import { GoRepo } from 'react-icons/go';
import './style.css';


class Dashboard extends Component {
  

  render () {
    
    return (
    <Container fluid style = {{margin: 0 }}>
        <div className = "notification"> Welcome, you are logged in as {this.props.info.login}</div>
        <Row>
            <Col style={{color: "white", background:"#111", height:"100vh"}} sm={12} md={2}>
            <Button variant="menu"> <FaUserAlt /> User </Button>
            <Button variant="menu" ><GoRepo />  Repositories</Button>
            <Button variant="menu" ><FaTrophy />  Achievements</Button>
            </Col>
            <Col md={10}>
              <h3>Welcome, {this.props.info.login}</h3>
            
            </Col>
        </Row>
    </Container> 
    
    )
  }
}

export default Dashboard;