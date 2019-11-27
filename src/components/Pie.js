import React, { Component } from 'react';
import * as d3 from "d3";
import '../style/style.css';

class PiePath extends Component {
    constructor(props) {
    super(props);
    this.state={
        width: Number,
        height: Number,
        data: Array,
        pie: Function,
        color: Function
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


class PieLegend extends Component{
    constructor(props){
        super(props);
        this.state={
            width: Number,
            height: Number,
            data: Array,
            pie: Function,
            color: Function
        }
    }

    createChart(_self){

        var texts = (this.props.pie(this.props.data)).map(function(d, i) {

            var transform="translate(10,"+i*30+")";

            var rectStyle = {
                fill:_self.props.color(i),
                stroke:_self.props.color(i)

            };

            var textStyle = {
                fill:_self.props.color(i)
            };

            return (
                <g transform={transform} key={i}>
                    <rect width="20" height="20" style={rectStyle} rx="2" rx="2"/>
                    <text x="30" y="15" className="legend" style={textStyle}>{d.data.name+" - "+d.value}</text>
                </g>
            )
        });
        return texts;
    }

    render(){

        var style={
            visibility:'visible'
        };

        var texts = this.createChart(this);
        var transform="translate("+(this.props.width/2+80)+",55)";
        return(
            <g is transform={transform} style={style}>
                {texts}
            </g>
        )
    }
};

class LanguagePie extends Component{
    constructor(props) {
        super(props);
        this.state={
            width: Number,
            height: Number,
            padAngle: Number,
            id: ''
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
                <svg className="svg" width={this.state.width}

                     height={this.props.height} onClick={this.updateData}>

                        
                    <PiePath width={this.state.width} height={this.props.height}
                                    pie={this.pie} color={this.color} data={this.props.data}/>

                    <PieLegend pie={this.pie} color={this.color} data={this.state.data}
                                      width={this.state.width} height={this.props.height}/>

                
                </svg>
            </div>
        );
    }
};


export default LanguagePie