import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import ChartTitle from '../../chart-presentation/chart-title/chart-title';
import DisplayChartDetails from '../../chart-presentation/display-chart-details/display-chart-details';
import * as d3 from 'd3';
const ChartData1 = [{ key: "Value1", value: 10 }, { key: "Value2", value: 40 }, { key: "Value3", value: 20 }];
const ChartData2 = [{ key: "Apple", value: 30 }, { key: "Mango", value: 20 }]
const options = {
    height: 100,
    width: 100,
    colors: ["red", "blue", "green"],
    textKey: "key",
    valueKey: "value",
    legends: true,
    legendsPosition: "bottom", // bottom | top  | left | right
    tooltip: true
}

export class DonutChart extends Component {
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
        // var radius = height > width ? (width/2) : (height/2);
        var radius = height > width ? (width / 2) : (height / 2);
        svg.attr("viewBox", '0 0 150 150');
        // if(options.legends){    
        //     if(options.legendsPosition==="bottom"){
        //         svg.attr("viewBox", `${radius} ${radius} ${2 * radius} ${3 * radius} `);
        //     }
        //     if(options.legendsPosition==="right"){
        //         svg.attr("viewBox", `${radius} ${radius} ${3 * radius} ${2 * radius} `);
        //     }

        // }
        // else
        //     svg.attr("viewBox", `${radius} ${radius} ${2 * radius} ${2 * radius} `);

        var g = svg.selectAll(".chart-container").data([0]);
        g.exit().remove();
        g.enter().append("g")
            .attr("class", "chart-container")
            .attr("transform", "translate(" + (radius + 5) + "," + (radius + 5) + ")");
        g = d3.selectAll(".chart-container")
        var color = d3.scaleOrdinal(options.colors);

        var tooltip = d3.select('body').selectAll('.d3tooltip').data([0]);
        tooltip.exit().remove();
        tooltip.enter()
            .append('div')
            .attr('class', 'd3tooltip')



        tooltip = d3.select('.d3tooltip')
        var pie = d3.pie().value(function (d) {
            return d[options.valueKey];
        });

        var path = d3.arc()
            .outerRadius(radius)
            .innerRadius(radius - 15);

        var pathOver = d3.arc()
            .innerRadius(radius - 15)
            .outerRadius(radius + 1);


        var arc = g.selectAll(".arc-group")
            .data(pie(data));
        arc.exit().remove();
        arc
            .enter()
            .append("g")
            .attr("class", "arc-group")
        arc = d3.selectAll(".arc-group")

        var donutCenterText = arc.selectAll(".donutCenterText").data([0]);
            donutCenterText.exit().remove();
            donutCenterText.enter()
            .append('text')
            .attr('class','donutCenterText')
            .attr('x',0)
            .attr('y',0)
            .style('display', 'block')
            .style("text-anchor",'middle')
            .text("dfcved")
            
            donutCenterText =  d3.selectAll('.donutCenterText')
        var arcPath = arc.selectAll("path").data(function (d) { return [d] });
        arcPath.exit().transition().delay(function (d, i) {
            return i * 500
        }).duration(500)
            .attrTween('d', function (d) {
                var i = d3.interpolate(d.startAngle + 0.1, d.endAngle);
                return function (t) {
                    d.endAngle = i(t);
                    return path(d)
                }
            }).remove();
        arcPath
            .enter()
            .append("path")
            .attr("class", "each-path")
            .merge(arcPath)
            .attr("d", path)
            .attr("fill", function (d, i, j) {
                return color(d.data[options.valueKey]);
            })
            .on('mouseover', function (d, i) {
                if (options.tooltip) {
                    d3.select(this).transition()
                        .duration(400)
                        .attr("d", pathOver);
                    tooltip
                        .style('top', (d3.event.pageY) + 'px')
                        .style('left', (d3.event.pageX) + 'px')
                        .style('display', 'block')
                        .style('border', '1px solid ' + color(d.data[options.valueKey]))
                        .html((d.data.key + " : " + d.data.value))

                        donutCenterText.style('display', 'block').text(d.data.value).style('fill',"#000000")
                }
            })
            .on('mousemove', function (d) {

                tooltip
                    .style('top', (d3.event.pageY - 65) + 'px')
                    .style('left', (d3.event.pageX - 50) + 'px');
            })
            .on('mouseout', function () {
                d3.select(this).transition()

                    .attr("d", path);



                tooltip.style('display', 'none')
                
                donutCenterText.style('display', 'none')
            })
            .on('click',function(d){
                
                d3.select(this).transition()
                        .duration(400)
                        .attr("d", pathOver);
                        donutCenterText.classed("donutSelected", true).style('display', 'block').text(d.data.value).style('fill',"#000000")

            })
            .transition().delay(function (d, i) {
                return i * 500
            }).duration(500)
            .attrTween('d', function (d) {
                var i = d3.interpolate(d.startAngle + 0.1, d.endAngle);
                return function (t) {
                    d.endAngle = i(t);
                    return path(d)
                }
            });

            

        if (options.legends) {
            var legendCircleRadius = 2
            var legendGroup = svg.selectAll(".legend-container").data([0]);
            legendGroup.exit().remove();
            legendGroup.enter().append("g")
                .attr("class", "legend-container")
                .attr("transform", "translate(" + (legendCircleRadius) + "," + (2 * radius + 15) + ")");
            legendGroup = d3.selectAll(".legend-container")

            var eachLegend = legendGroup.selectAll(".eachLegend").data(data);
            eachLegend.exit().remove();
            eachLegend
                .enter()
                .append('g')
                .attr('class', 'eachLegend')
                .merge(eachLegend)
                .attr("transform", function (d, i) {
                    return "translate(" + 0 + "," + (6 * i) + ")"
                });

            eachLegend = d3.selectAll(".eachLegend");

            var legendColor = eachLegend.selectAll(".legendColor").data(function (d) { return [d] });
            legendColor.exit().remove();
            legendColor
                .enter()
                .append("circle")
                .attr("class", "legendColor")
                .merge(legendColor)
                .attr("r", legendCircleRadius)

                .attr("cx", 0)
                .attr("cy", legendCircleRadius)
                .attr("fill", function (d, i, j) {
                    return color(d[options.valueKey]);
                });

            var legendText = eachLegend.selectAll(".legendText").data(function (d) { return [d] });
            legendText.exit().remove();
            legendText
                .enter()
                .append("text")
                .attr("class", "legendText")
                .merge(legendText)
                .attr("x", legendCircleRadius + 1)
                .attr("y", legendCircleRadius * 2)
                .text(function (d, i, j) {
                    console.log(d)
                    return d[options.textKey];
                })
                .style('font-size', "5px")
                .attr("fill", 'black');



        }


    }
    render() {


        return (
            <div style={{ padding: 10 }}>
                <ChartTitle title="Pie Chart" />
                <Grid container style={{ padding: 10, background: "#f9f9f9" }}>
                    <Grid item xs={12} md={7} >
                        <button onClick={() => { this.setState({ updateData: !this.state.updateData, data: this.state.updateData ? ChartData1 : ChartData2 }) }}>Change Data</button>

                        <div className="svg-container" style={{ padding: 20 }}>
                            <div style={{ width: "50%", margin: "auto" }}>
                                <svg className="svg-chart" ref={elem => this.chartNode = elem}></svg>
                            </div>
                        </div>


                    </Grid>
                    <Grid item xs={12} md={5}>
                        <DisplayChartDetails options={options} data={this.state.data} />

                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default DonutChart
