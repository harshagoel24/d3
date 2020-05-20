import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import ChartTitle from '../../chart-presentation/chart-title/chart-title';
import DisplayChartDetails from '../../chart-presentation/display-chart-details/display-chart-details';
import * as d3 from 'd3';
const ChartData1 = [{ key: "Value1", value: 10 }, { key: "Value2", value: 40 }, { key: "Value3", value: 20 }];
const ChartData2 = [{ key: "Apple", value: 30 }, { key: "Mango", value: 20 }, { key: "Orange", value: 60 }]
const options = {
    height: 50,
    width: 50,
    colors: ["red", "blue", "green"],
    textKey: "key",
    valueKey: "value"
}

export class BarChart extends Component {
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
        var radius = height > width ? (width) : (height);
        svg.attr("viewBox", `${radius} ${radius} ${2 * radius} ${2 * radius} `);

        var g = svg.selectAll(".chart-container").data([0]);
        g.exit().remove();
        g.enter().append("g")
            .attr("class", "chart-container")
            .attr("transform", "translate(" + (2 * radius) + "," + (2 * radius) + ")");
        g = d3.selectAll(".chart-container")
        var color = d3.scaleOrdinal(options.colors);

        var pie = d3.pie().value(function (d) {
            return d[options.valueKey];
        });

        var path = d3.arc()
            .outerRadius(radius)
            .innerRadius(0);

        var arc = g.selectAll(".arc-group")
            .data(pie(data));
        arc.exit().remove();
        arc
            .enter()
            .append("g")
            .attr("class", "arc-group")
        arc = d3.selectAll(".arc-group")

        var arcPath = arc.selectAll("path").data(function (d) { return [d] });
        arcPath.exit().remove();
        arcPath
            .enter()
            .append("path")
            .attr("class", "each-path")
            .merge(arcPath)
            .attr("d", path)
            .attr("fill", function (d, i, j) {
                return color(d.data[options.valueKey]);
            });


    }
    render() {


        return (
            <div style={{ padding: 10 }}>
                <ChartTitle title="Bar Chart" />
                <Grid container style={{ padding: 10, background: "#f9f9f9" }}>
                    <Grid item sm={7} >
                        <button onClick={() => { this.setState({ updateData: !this.state.updateData, data: this.state.updateData ? ChartData1 : ChartData2 }) }}>Change Data</button>

                        <div className="svg-container" style={{padding:50}}>
                            <div style={{width:"50%",margin:"auto"}}>
                                <svg className="svg-chart" ref={elem => this.chartNode = elem}></svg>
                                </div>
                                </div>
                       
                        
                    </Grid>
                            <Grid item sm={5}>
                                <DisplayChartDetails options={options} data={this.state.data} />

                            </Grid>
                </Grid>
            </div>
        )
    }
}

export default BarChart
