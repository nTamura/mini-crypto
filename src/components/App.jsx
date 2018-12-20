import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

import Navbar from 'components/Navigation/Navbar'
import Header from 'components/Common/Header'
import Main from 'components/Views/Main'
import About from 'components/Views/About'
import Charts from 'components/Views/Charts'
import Favorites from 'components/Views/Favorites'
import background from 'styles/prism.png'

const styles = () => ({
  app: {
    // backgroundImage: `url(${background})`
    // backgroundColor: '#323232'
    // backgroundColor: '#484B5B'34353F
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

  componentDidMount() {
    console.log(this.props)
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
            </Switch>
          </div>
        </div>
        <div style={{
          backgroundColor: '#34353F'
        }}
        >
          footer
        </div>
      </>
    )
  }
}

export default withStyles(styles)(App)
