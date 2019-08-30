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

        var xAxis = d3.axisBottom(x).scale(x);
        var yAxis = d3.axisLeft(y).ticks(10);

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

      // Draw X and Y axis
      //Drawing X Axis
      svg.append("g")
        .attr("transform", "translate(20, 500)")
        .attr("class", "x axis")
        .call(xAxis);

      //Drawing Y Axis
      svg.append("g")
        .attr("width", 700)
        .attr("class", "y axis")
        .attr("transform", "translate(" + margin +"," + margin +")")
        .call(yAxis);

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
                    .attr("r", 2)
                    .attr("cx", d => x(d.a))
                    .attr("cy", d => y(d.b))
                    .style("fill", "transparent")
                    .style("stroke-width", "2")
                    .style("stroke",  function (d) { return this.parentNode.__data__.color; })
                    .on("mouseover", mouseover)
                    .on("mousemove", function (d) {
                        divToolTip
                        .text("X: " + d.a + ", Y: " + d.b + ", Name: " + this.parentNode.__data__.name)
                        .style("left", (d3.event.pageX + 15) + "px")
                        .style("top", (d3.event.pageY - 10) + "px");
                    })
                    .on("mouseout", mouseout);

        // Adding Tooltip
        const divToolTip = d3.select("body").append("div")
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
          <div id="graph" ref='graph'></div>
        );
    }

  }

  export default BarChart;
