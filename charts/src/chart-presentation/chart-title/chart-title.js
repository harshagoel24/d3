import React, { Component } from 'react'
import {Grid} from '@material-ui/core';

export class ChartTitle extends Component {
    render() {
        return (
            <Grid>
                <p className="chart-title" style={{fontWeight:700,fontSize:35}}>
                    {this.props.title}
                </p>
            </Grid>
        )
    }
}

export default ChartTitle
