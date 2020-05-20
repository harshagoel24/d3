import React, { Component } from 'react'
import ChartData from './charts-data.json'
import { Link } from 'react-router-dom';
import './display-chart-list-styles.scss';

export class DisplayChartList extends Component {
    render() {
        return (
            <div className="chart-list">
                {ChartData.map((eachChart, index) => {
          return (
            <Link key={index} to={eachChart.link} style={{ color: 'inherit', textDecoration: "none" }}>
              <div className="chart-block">
                <div className="title-container">
                  <p className="chart-title">{eachChart.name}</p>
                </div>
                <div className="description-container">
                  <p className="chart-description">{eachChart.description}</p>
                </div>
              </div>
            </Link>
          )
        })}
            </div>
        )
    }
}

export default DisplayChartList;
