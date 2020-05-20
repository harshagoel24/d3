import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import DisplayChartList from './display-chart-list/display-chart-list'
import PieChart from './charts/pie-chart/pie-chart';
import BarChart from './charts/bar-chart/bar-chart';
import TreeMap from './charts/tree-map/tree-map';


class AppRouter extends Component {

    render() {

        return (
            <React.Fragment>
                <Switch>
                <Route exact path='/' component={DisplayChartList} />
                    <Route exact path='/piechart' component={PieChart} />
                    <Route exact path='/barchart' component={BarChart} />
                    <Route exact path='/treeMap' component={TreeMap} />
                </Switch>
            </React.Fragment>
        )
    }
}

export default AppRouter;