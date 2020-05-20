import React, { Component } from 'react'
import ReactJson from 'react-json-view';
import './display-chart-details-styles.scss';
import { Grid } from '@material-ui/core';
export class DisplayChartDetails extends Component {
    render() {
        return (
            <div className="details-container" >
                <Grid>
                    <p className="detail-title">Options</p>
                    <ReactJson
                    collapsed={true}
                    displayDataTypes={false}
                     src={this.props.options} />
                </Grid>
                <Grid>
                <p className="detail-title">Data</p>
                    <ReactJson
                    collapsed={true}
                    displayDataTypes={false}
                    src={this.props.data} />
                </Grid>
            </div>
        )
    }
}

export default DisplayChartDetails
