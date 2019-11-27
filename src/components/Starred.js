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
            <Card style={{ width: '18rem' }}>
            <Card.Body>
            <Card.Title>{x[i].name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{x[i].full_name}</Card.Subtitle>
            <Card.Text>
                {x[i].description}
            </Card.Text>
            <Card.Link href={x[i].html_url}>Visit</Card.Link>
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
        
    <div style={{height:"200px"}}>
        {this.props.starred!=null ? (
        
          <Row>
                <ol>
                    {main.map(main => (
                    <li key={main}>{main}</li>
                    ))}
                </ol>
        </Row>

        ) : (

            {main}
        )}
      
    </div>
      
    )
}

}

export default Star;

