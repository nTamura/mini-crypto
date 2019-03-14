import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import {
  SwipeableDrawer,
  Typography,
  IconButton,
  Divider,
} from '@material-ui/core'
import {
  Menu as MenuIcon,
  Star,
  TrendingUp,
  Equalizer,
  Language,
} from '@material-ui/icons'
import GoBack from 'components/Common/GoBack'
import logo from 'assets/icon.png'

class Navbar extends Component {
  state = {
    drawer: false,
  }

  toggleDrawer = open => () => {
    this.setState({ drawer: open })
  }

  matchPath = path => {
    switch (path) {
      case '/':
        return <img src={logo} style={{ width: 48 }} alt="logo" />
      case '/charts':
        return <Typography variant="h6">Global Tracker</Typography>
      case '/favorites':
        return <Typography variant="h6">Personal Tracker</Typography>
      case '/portfolio':
        return <Typography variant="h6">Portfolio</Typography>
      default:
        return <img src={logo} style={{ width: 48 }} alt="logo" />
    }
  }

  render() {
    const { classes, location } = this.props
    const { drawer } = this.state
    return (
      <div className={classes.root}>
        <div className={[classes.menuBar, 'container'].join(' ')}>
          <GoBack />
          <div className={classes.titleContainer}>
            {this.matchPath(location.pathname)}
          </div>
          <IconButton
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
            className={classes.flex}
          >
            <div>
              <div className={classes.drawerTitleContainer}>
                <img src={logo} className={classes.logo} alt="logo" />
                <Typography variant="subtitle1" className={classes.drawerTitle}>
                  Mini-Crypto
                </Typography>
              </div>

              <Divider />

              <Typography
                component={Link}
                to="/"
                variant="subtitle1"
                className={classes.navLink}
              >
                <TrendingUp className={classes.iconNews} />
                Trending News
              </Typography>
              <Typography
                component={Link}
                to="/charts"
                variant="subtitle1"
                className={classes.navLink}
              >
                <Language className={classes.iconGlobal} />
                Global Tracker
              </Typography>
              <Typography
                component={Link}
                to="/favorites"
                variant="subtitle1"
                className={classes.navLink}
              >
                <Star className={classes.iconFav} />
                Personal Tracker
              </Typography>
              <Typography
                // component={Link}
                // to="/portfolio"
                variant="subtitle1"
                className={classes.navLinkMuted}
              >
                <Equalizer className={classes.iconPort} />
                Portfolio
              </Typography>
            </div>
            <Typography
              component={Link}
              to="/about"
              variant="caption"
              align="right"
              className={classes.navLinkMuted}
            >
              About
            </Typography>
          </div>
        </SwipeableDrawer>
      </div>
    )
  }
}

const styles = () => ({
  root: {
    padding: '16px 0',
    backgroundColor: '#34353F',
  },
  menuBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
  },
  title: {
    paddingLeft: 12,
    textDecoration: 'none',
  },
  drawerTitleContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  drawerTitle: {
    textDecoration: 'none',
    textAlign: 'center',
    padding: 16,
  },
  navLink: {
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    padding: 16,
  },
  navLinkMuted: {
    color: 'rgba(255,255,255,0.4)',
    textDecoration: 'none',
    padding: 16,
  },
  flex: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'space-between',
  },
  logo: {
    width: 60,
    height: '100%',
  },
  iconNews: {
    paddingRight: 14,
    color: '#d42f10',
  },
  iconGlobal: {
    paddingRight: 14,
    color: '#82B177',
  },
  iconFav: {
    paddingRight: 14,
    color: '#EF932D',
  },
  iconPort: {
    paddingRight: 14,
    color: '#CFEBE7',
  },
})

export default withRouter(withStyles(styles)(Navbar))
