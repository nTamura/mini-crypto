import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { SwipeableDrawer, Typography, IconButton, Divider } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { Menu as MenuIcon, Star, TrendingUp } from '@material-ui/icons'
import GoBack from 'components/Common/GoBack'

const styles = () => ({
  root: {
    padding: 16,
    backgroundColor: '#34353F'
  },
  menuBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center'
  },
  title: {
    paddingLeft: 12,
    textDecoration: 'none'
  },
  drawerTitle: {
    textDecoration: 'none',
    textAlign: 'center',
    padding: 16
  },
  navLink: {
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    padding: 16
  },
  icon: {
    paddingRight: 14,
    color: 'red'
  }
})

class Navbar extends Component {
  constructor() {
    super()
    this.state = {
      drawer: false
    }
  }

  toggleDrawer = open => () => {
    this.setState({ drawer: open })
  }

  matchPath = path => {
    switch (path) {
      case '/':
        return 'Crypto Charts'
      case '/charts':
        return 'Global Charts'
      case '/favorites':
        return 'Personal Charts'
      case '/portfolio':
        return 'Your Portfolio'
      default:
        return 'Crypto Charts'
    }
  }

  render() {
    const { classes, location } = this.props
    const { drawer } = this.state
    return (
      <div className={classes.root}>
        <div className={classes.menuBar}>
          <GoBack />
          <div className={classes.titleContainer}>

            <Typography
              variant="h6"
              className={classes.title}
            >
              {this.matchPath(location.pathname)}
            </Typography>
            <Typography
              variant="caption"
            >
              {/*
                once you select a coin, show coin name here
              */}
            </Typography>
          </div>

          <IconButton
            // aria-haspopup="true"
            // aria-owns={anchorEl ? 'hamburgerMenu' : null}
            className={classes.navHamburger}
            onClick={this.toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </div>
        <SwipeableDrawer
          anchor="right"
          open={drawer}
          onClose={this.toggleDrawer(false)}
          onOpen={this.toggleDrawer(true)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer(false)}
            onKeyDown={this.toggleDrawer(false)}
          >
            <Typography
              component={Link}
              to="/"
              variant="subheading"
              className={classes.drawerTitle}
            >
              React-Crypto App
            </Typography>
            <Divider />
            <Typography
              component={Link}
              to="/charts"
              variant="subheading"
              className={classes.navLink}
            >
              <TrendingUp className={classes.icon} />
              Global Charts
            </Typography>
            <Typography
              component={Link}
              to="/favorites"
              variant="subheading"
              className={classes.navLink}
            >
              <Star className={classes.icon} />
              Personal Charts
            </Typography>
          </div>
        </SwipeableDrawer>
      </div>
    )
  }
}
export default withRouter(withStyles(styles)(Navbar))
