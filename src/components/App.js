import React, { Component } from 'react';
import logo from '../resources/logo.svg';
import '../styles/App.css';
// D3
import {scaleLinear} from 'd3-scale';
import {extent} from 'd3-array';
import {select} from 'd3-selection';
import {axisRight, axisBottom} from 'd3-axis';

class App extends Component {

    constructor(props){
      super(props);
      
      this.state = {
          scatterData : [
              {friends: 5, salary: 22000},
              {friends: 3, salary: 18000},
              {friends: 10, salary: 88000},
              {friends: 0, salary: 18000},
              {friends: 27, salary: 56000},
              {friends: 8, salary: 74000},
          ],
          width: 1000,
          height: 1000
      }
  }

    componentDidMount(){
        this.createPlot(this.state.scatterData, this.state.width, this.state.height);
    }

    componentDidUpdate(){
        this.createPlot(this.state.scatterData, this.state.width, this.state.height);
    }

    createPlot = (data, width, height) => {
        // Extents of data
        let margins = {
            xMargin: 20,
            yMargin: 20
        }
        let xExtent = extent(data, d => d.salary)
        let yExtent = extent(data, d => d.friends)
        // Scales
        let xScale  = scaleLinear()
            .domain(xExtent)
            .range([margins.xMargin, width - margins.xMargin])
        let yScale  = scaleLinear()
            .domain(yExtent)
            .range([margins.yMargin, height - margins.yMargin])
        let rScale  = scaleLinear()
            .domain(xExtent)
            .range([3, 10])
        // Axis
        let xAxis = axisBottom()
            .scale(xScale)
        let yAxis = axisRight()
            .scale(yScale)
        // SVG
        let svg = select('.graph')
            .append('svg')
            .attr('width', width)
            .attr('height', height)
        // Append Axis
        svg.append("g")
            .attr("id", "yAxisG")
            .call(yAxis)
        svg.append("g")
            .attr("id", "xAxisG")
            .call(xAxis)
        // Append Circles
        svg.selectAll('circle')
            .data(data)
            .enter()
            .append('circle')
            .attr('cx', d => xScale(d.salary))
            .attr('cy', d => yScale(d.friends))
            .attr('r' , d => rScale(d.salary))
    }

    render() {
        return (
            <div className="graph">

            </div>
        );
    }
}

export default App;
