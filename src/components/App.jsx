import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Navbar from 'components/Navigation/Navbar'
import Footer from 'components/Navigation/Footer'
import Main from 'components/Views/Main'
import About from 'components/Views/About'
import Charts from 'components/Views/Charts'
import Favorites from 'components/Views/Favorites'
import NotFound from 'components/Views/NotFound'

const styles = () => ({
  app: {
    background: 'linear-gradient(to right bottom, #484B5B, #34353F)'
  },
  root: {
    paddingBottom: 32,
  }
})

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    const { classes } = this.props
    return (
      <>
        <div id="App" className={classes.app}>
          <Navbar />
          <div className={[classes.root, 'container'].join(' ')}>
            <Switch>
              <Route exact path="/" component={Main} />
              <Route exact path="/charts" component={Charts} />
              <Route exact path="/favorites" component={Favorites} />
              <Route exact path="/about" component={About} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
        <Footer />
      </>
    )
  }
}

export default withStyles(styles)(App)
