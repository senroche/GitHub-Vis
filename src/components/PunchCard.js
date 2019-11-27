import React, { Component } from 'react';
import { scaleLinear, scaleBand } from 'd3-scale';
import AxisSettings from './Axis.js';
import GeneratePunchCard from './GeneratePunchCard.js';
import { extent } from 'd3-array';

class CreatePunchCard extends Component {
  constructor() {
    super();
    this.state = {
      data: [
        { name: 'Mon', value: 0,count:0},
        { name: 'Mon', value: 15,count:6},
        { name: 'Tue', value: 14,count:3 },
        { name: 'Wed', value: 11,count:1 },
        { name: 'Thu', value: 23,count:2 },
        { name: 'Fri', value: 14,count:3 },
        { name: 'Sat', value: 22,count:5 },
        { name: 'Sun', value: 16,count:5 },
      ],
    }
  }
 
  render() {
    const { data } = this.state;
    const parentWidth = 500;

    const margins = {
      top: 20,
      right: 20,
      bottom: 20,
      left: 20,
    };

    const width = parentWidth - margins.left - margins.right;
    const height = 500 - margins.top - margins.bottom;

    const xScale = scaleBand()
      .domain(data.map(d => d.name))
      .rangeRound([0, width]).padding(0.1);

    const yScale = scaleLinear()
      .domain(extent(data, d => d.value))
      .range([height, 0])


    return (
      <div>
        <svg width={width + margins.left + margins.right}
          height={height + margins.top + margins.bottom}>

          <g transform={`translate(${margins.left}, ${margins.top})`}>
            <AxisSettings {...{ xScale, yScale, height }} />
            <GeneratePunchCard data={data} xScale={xScale} yScale={yScale} width={width} height={height} />
          </g>
        </svg>
      </div>
    );
  }
}
export default CreatePunchCard;
