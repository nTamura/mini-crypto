
import React from 'react'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

import crab from 'assets/crab.png'

const styles = ({
  root: {
    padding: 32,
    marginTop: 32,
    textAlign: 'center'
  },
  crab: {
    padding: 32
  },
  link: {
    color: '#EE6352',
    textDecoration: 'none'
  }
})

const NotFound = ({ classes }) => (
  <div className={classes.root}>
    <Typography variant="h5">
      This kills the internet.
    </Typography>
    <img src={crab} className={classes.crab} alt="404" />
    <Typography>
      Check the URL of the page you are trying to get to, or
      <Link to="/" className={classes.link}>
        {' click here '}
      </Link>
      to go back home.
    </Typography>
  </div>
)
export default withStyles(styles)(NotFound)
