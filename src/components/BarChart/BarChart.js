import React, {Component} from 'react';
import _ from './../../../node_modules/lodash'
import * as d3 from "d3";

class BarChart extends Component {

    constructor(props){
        super(props);

        this.state = {
            candidatesToDraw: this.props.selectedCandidatesData,
            allCandidates: this.props.data
        };

        this.legendElementClickHandler = this.legendElementClickHandler.bind(this);
    }

    componentDidMount() {
      this.drawChart();
    }
    componentDidUpdate(){
        if(this.state.candidatesToDraw !== this.props.selectedCandidatesData) {
            this.setState({candidatesToDraw: this.props.selectedCandidatesData});
        }

      this.refs.graph.innerHTML = '';
      this.drawChart();
    }

    legendElementClickHandler(candidate) {
        this.props.action(candidate);
    }

    calculateMaxMinValues(data){
      const returnValue = {
        "minX": 1000,
        "maxX": 0,
        "minY": 1000,
        "maxY": 0
      };
      data.forEach(d => {
        d.data.forEach(el => {
          if(el.x < returnValue.minX) returnValue.minX = el.x;
          if(el.y < returnValue.minY) returnValue.minY = el.y;
          if(el.x > returnValue.maxX) returnValue.maxX = el.x;
          if(el.y > returnValue.maxY) returnValue.maxY = el.y;
        })
      });
      return returnValue;
    }

    drawChart() {
        // LINE CHART
        const {width, height} = this.props;
        const margin = 20;

        const marginValues = this.calculateMaxMinValues(this.state.candidatesToDraw);

        const h = height - 2 * margin;
        const w = width - 2 * margin;

        // Remove extra dots
        const zoomedCandidates = this.props.selectedCandidatesData;

        zoomedCandidates.map(d => {
            d.data = _.remove(d.data, function(n) {
                return n.x % 6 === 0;
            });
        });

        //x scale
        const x = d3.scaleLinear()
        .domain([marginValues.minX, marginValues.maxX]) //domain: [min,max] of a
        .range([margin, w]);

        //y scale
        const y = d3.scaleLinear()
        .domain([marginValues.minY, marginValues.maxY]) // domain [0,max] of b (start from 0)
        .range([h, margin]);

        const xAxis = d3.axisBottom(x)
            .scale(x)
            .tickValues(d3.range(marginValues.minX, marginValues.maxX, 6))
            .tickFormat((d) => this.state.allCandidates[0].data[d].args.timestamp.title.substring(0, 3) + ' \'' + this.state.allCandidates[0].data[d].args.timestamp.title.substring(10, 12))
            .tickSize(0)

        function make_y_gridlines() {
            return d3.axisLeft(y)
                .ticks(10)
        }

        //line generator: each point is [x(d.a), y(d.b)] where d is a row in data
        // and x, y are scales (e.g. x(10) returns pixel value of 10 scaled by x)
        let svg = d3.select("#graph").append("svg")
            .attr("width", width)
            .attr("height", height + 3 * margin);

        const line = d3.line()
                .x(d => x(d.x))
                .y(d => y(d.y));

        // Drawing Grid Lines
        svg.append("g")
            .attr("transform", "translate(30, 500)")
            .attr("class", "x axis")
            .call(xAxis);

        svg.append("g")
            .attr("class","grid")
            .style("stroke",("3,3"))
            .attr("transform", "translate(50, 20)")
            .call(make_y_gridlines()
                .tickSize(-width + 3 * margin)
            )
            .call(g => g.selectAll(".tick text")
                .attr("x", -15)
                .text(function (d) { return d + "%"; }))

        // Drawing Lines for each segments
        const segment = svg.selectAll(".segment")
                        .data(this.state.candidatesToDraw)
                        .enter().append("g")
                        .attr("class", "segment");

        segment.append("path")
                .attr("class", "line")
                .attr("transform", "translate(30," + margin +")")
                .attr("visible",1)
                .attr("d", d => line(d.data))
                .style("stroke", d => d.color);

      //Drawing X Axis
      svg.selectAll("g.x.axis path, g.y.axis path")
        .style("stroke", '#000')
        .style("stroke-width", "1px");

      svg.selectAll("g.x.axis line, g.y.axis line")
        .style("stroke", '#000')
        .style("stroke-width", "1px");

        svg.selectAll("g.x.axis g.tick")
            .style("stroke", '#9A9A9A')
            .style("stroke-width", "1px")
            .style("fill-opacity", "0.5")

      segment.selectAll("dot")
                    .data(d => d.data)
                    .enter().append("circle")
                    .attr('transform', 'translate(30, ' + margin +')')
                    .attr("r", 4)
                    .attr("cx", d => x(d.x))
                    .attr("cy", d => y(d.y))
                    .on("mouseover", mouseover)
                    .on("mousemove", function (d) {
                        divToolTip
                            .html('<div class="tooltip-inside"><p class="candidate-name">' + this.parentNode.__data__.name + '</p><p class="chance">' + d.y + '%</p></div>')
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
              <div id="legend">
                      {this.state.candidatesToDraw.map((candidateData) =>
                          <div className="legendElement"
                               key={candidateData.name}
                               onClick={() => this.legendElementClickHandler(candidateData.name)}
                               >
                              <div className="legendElementName" style={{ color: candidateData.color }}>{candidateData.name}</div>
                              <div className="legendElementChance">{candidateData.data[candidateData.data.length - 1].y + "%"}</div>
                          </div>
                      )}
              </div>
          </div>
        );
    }

  }

  export default BarChart;
