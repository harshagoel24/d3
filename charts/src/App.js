import React, { Component } from 'react';
import AppRouter from './AppRouter';
import { HashRouter as Router } from 'react-router-dom';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);

  }


  render() {


    return (
      <div>
        <Router>
        <AppRouter/>
        
        </Router>
      </div>
    );
  }
}

export default App;
