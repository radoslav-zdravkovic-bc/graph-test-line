import React, {Component} from 'react';
import * as d3 from "d3";
//import * as scale from "d3-scale";

class BarChart extends Component {
    componentDidMount() {
      this.drawChart();
    }
    componentDidUpdate(){
      this.refs.graph.innerHTML = '';
      this.drawChart();
    }

    calculateMaxMinValues(data){
      const returnValue = {
        "minA": 1000,
        "maxA": 0,
        "minB": 1000,
        "maxB": 0
      };
      data.forEach(d => {
        d.coordinates.forEach(el => {
          if(el.a < returnValue.minA) returnValue.minA = el.a;
          if(el.b < returnValue.minB) returnValue.minB = el.b;
          if(el.a > returnValue.maxA) returnValue.maxA = el.a;
          if(el.b > returnValue.maxB) returnValue.maxB = el.b;
        })
      });
      return returnValue;
    }

    drawChart() {
        // LINE CHART
        const {data, width, height} = this.props;
        const margin = 20;

        const marginValeus = this.calculateMaxMinValues(data);

        const h = height - 2 * margin;
        const w = width - 2 * margin;

        //x scale
        const x = d3.scaleLinear()
        .domain([marginValeus.minA, marginValeus.maxA]) //domain: [min,max] of a
        .range([margin, w]);

        //y scale
        const y = d3.scaleLinear()
        .domain([marginValeus.minB, marginValeus.maxB]) // domain [0,max] of b (start from 0)
        .range([h, margin]);

        const xAxis = d3.axisBottom(x).scale(x);

        function make_y_gridlines() {
            return d3.axisLeft(y)
                .ticks(10)
        }

        // xData gives an array of distinct 'Weeks' for which trends chart is going to be made.
        //const xData = data[0].coordinates.map(d => d.a);

        //line generator: each point is [x(d.a), y(d.b)] where d is a row in data
        // and x, y are scales (e.g. x(10) returns pixel value of 10 scaled by x)
        let svg = d3.select("#graph").append("svg")
            .attr("width", width + 2 * margin)
            .attr("height", height + 2 * margin);

        const line = d3.line()
                .x(d => x(d.a))
                .y(d => y(d.b));

        // Drawing Grid Lines
        svg.append("g")
            .attr("transform", "translate(20, 500)")
            .attr("class", "x axis")
            .call(xAxis);

        svg.append("g")
            .attr("class","grid")
            .style("stroke",("3,3"))
            .attr("transform", "translate(40, 20)")
            .call(make_y_gridlines()
                .tickSize(-width + 3 * margin)
            )
            .call(g => g.selectAll(".tick text")
                .attr("x", -15)
                .text(function (d) { return d + "%"; }))

        // Drawing Lines for each segments
        const segment = svg.selectAll(".segment")
                        .data(data)
                        .enter().append("g")
                        .attr("class", "segment");

        segment.append("path")
                .attr("class", "line")
                .attr("transform", "translate(20," + margin +")")
                .attr("visible",1)
                .attr("d", d => line(d.coordinates))
                .style("stroke", d => d.color);

      //Drawing X Axis
      svg.selectAll("g.x.axis path, g.y.axis path")
        .style("stroke", '#000')
        .style("stroke-width", "1px");

      svg.selectAll("g.x.axis line, g.y.axis line")
        .style("stroke", '#000')
        .style("stroke-width", "1px");

      segment.selectAll("dot")
                    .data(function (d) { return d.coordinates; })
                    .enter().append("circle")
                    .attr('transform', 'translate(20, ' + margin +')')
                    .attr("r", 4)
                    .attr("cx", d => x(d.a))
                    .attr("cy", d => y(d.b))
                    .on("mouseover", mouseover)
                    .on("mousemove", function (d) {
                        divToolTip
                            .html('<div class="tooltip-inside"><p class="candidate-name">' + this.parentNode.__data__.name + '</p><p class="chance">' + d.a + '%</p></div>')
                            .style("background", "#fff")
                            .style("width", "184px")
                            .style("height", "50px")
                            .style("left", (d3.event.pageX - 92) + "px")
                            .style("top", (d3.event.pageY - 70) + "px");
                    })
                    .on("mouseout", mouseout);

        // Adding Tooltip
        const divToolTip = d3.select("#graph").append("div")
                    .attr("class", "tooltip")
                    .style("opacity", 1e-6);

        function mouseover() {
            divToolTip.transition()
                .duration(500)
                .style("opacity", 1);
        }
        function mouseout() {
            divToolTip.transition()
                .duration(500)
                .style("opacity", 1e-6);
        }
    }

    render(){
        return  (
          <div id="graph-container">
              <div className="chart-header">
                  <h4 className="chance">CHANCE OF WINNING</h4>
              </div>
              <div id="graph" ref='graph'></div>
          </div>
        );
    }

  }

  export default BarChart;
