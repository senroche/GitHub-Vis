import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import '../style/style.css';
import Card from 'react-bootstrap/Card'


class Star extends Component {
  constructor(props){
    super(props);
  }

  addStarred(){
    let x = this.props.starred;
    let arr = [];

    if(x.length===0){
        return null;
    }
    for(var i = 0; i<x.length; i++){
        var card=
            <Card style={{ width: '100%' , height:"250px", marginTop:"10px", marginRight:"10px"}}>
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
    return (
        
    <div style={{marginLeft:"25px"}}>

        {this.props.starred.length===0 ? (
        <h3> Oops!, looks like you have any stars.</h3>
        ) : (

            <div className='col-lg-8'>
             <Row>
     
            {main.map(main => (
            <div className='col-lg-2' key={main}>{main}</div>
            ))}    
        </Row>
        </div>
        )}
      
    </div>
      
    )
}

}

export default Star;

