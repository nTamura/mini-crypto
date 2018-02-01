import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Charts from './components/Charts';
import Favorites from './components/Favorites';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/charts' component={Charts}/>
            <Route path='/favorites' component={Favorites}/>
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
