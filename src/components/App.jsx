import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import Navbar from 'components/Navigation/Navbar'
import Header from 'components/Common/Header'
import Main from 'components/Views/Main'
import About from 'components/Views/About'
import Charts from 'components/Views/Charts'
import Favorites from 'components/Views/Favorites'


class App extends Component {
  constructor() {
    super()
    this.state = {
    }
  }

  render() {
    return (
      <>
        <Navbar />
        <Header />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/charts" component={Charts} />
            <Route exact path="/favorites" component={Favorites} />
            <Route exact path="/about" component={About} />
          </Switch>
        </div>
      </>
    )
  }
}

export default App
