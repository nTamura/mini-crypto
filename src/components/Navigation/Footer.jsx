import React from 'react'
import { Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const styles = () => ({
  root: {
    padding: 8,
    backgroundColor: '#34353F',
    textAlign: 'right'
  },
  text: {
    color: 'rgba(255,255,255,0.6)'
  }
})

const Navbar = ({ classes }) => (
  <div className={classes.root}>
    <Typography variant="caption" className={classes.text}>
      nTamura 2018
    </Typography>
  </div>
)


export default withStyles(styles)(Navbar)
