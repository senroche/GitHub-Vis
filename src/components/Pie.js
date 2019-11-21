import React, { Component } from 'react';
import * as d3 from "d3";

class PiePath extends Component {
    constructor(props) {
    super(props);
    this.state={
        width: '',
        height: '',
        data: '',
        pie: '',
        color:''
        }
    }
    
    componentWillMount(){
        var radius=this.props.height;
        var outerRadius=radius/2;
        var innerRadius=radius/3.3;
        this.arc= d3.arc()
            .outerRadius(outerRadius)
            .innerRadius(innerRadius)
            
        this.transform='translate('+radius/2+','+radius/2+')';

    }

    createGraph(_self){
        var paths = (this.props.pie(this.props.data))
        .map(function(d, i) {
            return (
                <path className = "section" fill={_self.props.color(i)} d={_self.arc(d)} key={i}/>
            )
        });
        return paths;
    }

    render(){
        var paths = this.createGraph(this);
        return(
            <g transform={this.transform}>
                {paths} 
            </g>
        )
    }
};

class LanguagePie extends Component{
    constructor(props) {
        super(props);
        this.state={
        width: '',
        height: '',
        padAngle: '',
        id: '',
        }
    }

     componentWillMount(){
        this.pie= d3.pie()
            .value(function(d){return d.count})
            .padAngle(this.props.padAngle)
            .sort(null)

        this.color = d3.scaleOrdinal().range(['#68c8d7','#eccd63','#bb8cdd','#de6942','#52b36e','#bbc7d9']);

        this.setState({data: this.props.data , width: this.props.width});
    }

    render(){

        return (
            <div>
                <svg id={this.props.id} width={this.state.width}

                     height={this.props.height} onClick={this.updateData}>

                    <PiePath width={this.state.width} height={this.props.height}
                                    pie={this.pie} color={this.color} data={this.props.data}/>

                </svg>
            </div>
        );
    }
};


export default LanguagePie