import React, { Component } from 'react';
import { select, selectAll } from 'd3-selection';
import { transition } from 'd3-transition';
import * as d3 from "d3";

class GeneratePunchCard extends Component {
    constructor() {
      super();
      this.ref = React.createRef();
    }
    componentDidMount() {
      const node = this.ref.current;
      const { xScale, yScale, data, lineGenerator } = this.props;
  
      const initialData = data.map(d => ({
        name: d.name,
        value: 0
      }));
  
  
       select(node)
        .append("g")
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function(d) { return xScale(d.name) } )
        .attr("cy", function(d) { return yScale(d.value) } )
        .attr("r", 4)
      
  
      this.updateChart()
    }
    
    componentDidUpdate() {
      this.updateChart();
    }
    updateChart() {
      const {
          lineGenerator, xScale, yScale, data,
      } = this.props;
  
      const t = transition().duration(1000);
      const dot = selectAll('.circle');
  
    }
    render() {
      return <g className="line-group" ref={this.ref} />;
    }
  }
  
  export default GeneratePunchCard;