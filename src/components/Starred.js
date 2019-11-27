import React, { Component } from 'react';
import Pie from './Pie.js'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../style/style.css';
import CreatePunchCard from './PunchCard.js';
import Card from 'react-bootstrap/Card'
import { Route} from "react-router";

class Star extends Component {
  constructor(props){
    super(props);
  }

  addStarred(){
    let x = this.props.starred;
    let arr = [];

    if(x.length===0){
        return <h3>Looks like you havent starred anything!</h3>
    }
    for(var i = 0; i<x.length; i++){
        var card=
            <Card style={{ width: '100%' ,height: "200px", marginTop:"10px", marginRight:"10px"}}>
            <Card.Body>
            <Card.Link href={x[i].html_url}><Card.Title>{x[i].name}</Card.Title></Card.Link>
            <Card.Subtitle className="mb-2 text-muted">{x[i].full_name}</Card.Subtitle>
            <Card.Text>
                {x[i].description}
            </Card.Text>
            </Card.Body>
            </Card>
        arr.push(card);
  }
  return arr;
  }
 

  render () {
    let main = this.addStarred();
    console.log('Is it here', this.props.starred[0].full_name);
    return (
        
    <div style={{marginLeft:"25px"}}>

        {this.props.starred!=null ? (
        <div className='col-lg-8'>
        <Row>
     
            {main.map(main => (
            <div className='col-lg-2' key={main}>{main}</div>
            ))}    
        </Row>
        </div>
        ) : (

            {main}
        )}
      
    </div>
      
    )
}

}

export default Star;

