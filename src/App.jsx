import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Charts from './components/Charts';
import Favorites from './components/Favorites';
// import { Navbar, Home, Charts, Favorites } from 'components'
import './App.css';
import axios from 'axios';
const url = 'https://api.coinmarketcap.com/v1/ticker/?convert=CAD&limit=25'

class App extends Component {
  constructor() {
    super();
    this.state = {
      topChart: [],
      userChart: []
    };
  }

  getChart = (url) => {
    let promise = axios.get(url)
    promise.then((response) => {
      this.setState({
        topChart: response.data
      })
    })
  }

  componentDidMount(){
    this.getChart(url);    
    setInterval( () => {
      this.getChart(url);
    },30000)
  }

  addFavorite = (e) => {
    e.preventDefault()
    console.log(e)
  }
  delFavorite = (e) => {
    e.preventDefault()
    console.log('add')
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path='/' component={Home}/>    
            <Route path='/charts' render={
              ()=><Charts 
                getChart={this.getChart} 
                topChart={this.state.topChart} 
              />
            }/>
            <Route path='/favorites' render={
              ()=><Favorites
                getChart={this.getChart} 
                addFavorite={this.addFavorite} 
                delFavorite={this.delFavorite} 
                topChart={this.state.topChart} 
                userChart={this.state.userChart} 
              />
            }/>
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
