import React, { Component } from 'react'
import * as d3 from 'd3';
import ChartData1 from './data.json'
import ChartTitle from '../../chart-presentation/chart-title/chart-title';
import DisplayChartDetails from '../../chart-presentation/display-chart-details/display-chart-details';
import { Grid } from '@material-ui/core';
const options = {
    height: 500,
    width: 500,
    colors: ["red", "blue", "green"],
    textKey: "key",
    valueKey: "value"
}

export class TreeMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data ? this.props.data : ChartData1,
            updateData: false
        }
    }
    componentDidMount() {
        this.createChart();
    }
    componentDidUpdate() {
        this.createChart();
    }
    createChart = () => {
        var data = this.state.data;
        var svg = d3.select(this.chartNode);

        var width = options.width, height = options.height;
        svg.attr("viewBox", `0 0  ${2 * width} ${2 * height} `);

        var g = svg.selectAll(".chart-container").data([0]);
        g.exit().remove();
        g.enter().append("g")
            .attr("class", "chart-container")
            .attr("transform", "translate(" + 50 + "," +50 + ")");
        g = d3.selectAll(".chart-container")



        // Initialize the links
        var link = g
            .selectAll("line")
            .data(data.links)
            .enter()
            .append("line")
            .style("stroke", "#aaa")

        // Initialize the nodes
        var node = g
            .selectAll("circle")
            .data(data.nodes)
            .enter()
            .append("circle")
            .attr("r", 5)
            .style("fill", "#69b3a2")
            .call(d3.drag()
   .on("drag", dragged)
   .on("end", dragended));

        // Let's list the force we wanna apply on the network
        var simulation = d3.forceSimulation(data.nodes)                 // Force algorithm is applied to data.nodes
            .force("link", d3.forceLink()                               // This force provides links between nodes
                .id(function (d) { return d.id; })                     // This provide  the id of a node
                .links(data.links)
                .distance(10)                                    // and this the list of links
            )
            .force("charge", d3.forceManyBody().strength(-400))         // This adds repulsion between nodes. Play with the -400 for the repulsion strength
            .force("center", d3.forceCenter(width / 2, height / 2))     // This force attracts nodes to the center of the svg area
            .on("end", ticked)
            // .distance(5);
            


        // This function is run at each iteration of the force algorithm, updating the nodes position.
        function ticked(e) {
            console.log(e)
            link
                .attr("x1", function (d) { 
                    return d.source.x; 
                })
                .attr("y1", function (d) { 
                    return d.source.y;  
                 })
                .attr("x2", function (d) { 
                    return d.target.x; 
                })
                .attr("y2", function (d) { 
                    return d.target.y;
                 });

            node
                .attr("fx", function (d) { 
                    return d.x;
                 })
                .attr("fy", function (d) { 
                    return 20 * d.level;
                 });
        }
        function dragged(d) {
            console.log(d);
            d.fx = d3.event.x * d.level;
            d.fy = d3.event.y * d.level;
          }
          
          function dragended(d) {
              console.log(d)
            d.fx = d3.event.x * d.level;
            d.fy = d3.event.y * d.level;
          }




    }
    render() {
        return (
            <div style={{ padding: 10 }}>
                <ChartTitle title="Tree Map" />
                <Grid container style={{ padding: 10, background: "#f9f9f9" }}>
                    <Grid item sm={7} style={{ height: 600, width: 200 }} >
                        <div className="svg-container">
                            <svg className="svg-chart" ref={elem => this.chartNode = elem}></svg>
                        </div>
                    </Grid>
                    <Grid item sm={5}>
                        <DisplayChartDetails options={this.state.data} data={this.state.data} />

                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default TreeMap
