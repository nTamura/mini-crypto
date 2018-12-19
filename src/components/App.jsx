import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

import Navbar from 'components/Navigation/Navbar'
import Header from 'components/Common/Header'
import Main from 'components/Views/Main'
import About from 'components/Views/About'
import Charts from 'components/Views/Charts'
import Favorites from 'components/Views/Favorites'

const styles = () => ({
  root: {
    backgroundColor: '#323232',
    paddingBottom: 32
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
        <Navbar />
        {/* <Header /> */}
        <div className={['container', classes.root].join(' ')}>
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

export default withStyles(styles)(App)
