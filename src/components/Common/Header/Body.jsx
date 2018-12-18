import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
// import { Typography, Button, Grid } from '@material-ui/core'

const styles = theme => ({
  root: {
    backgroundColor: '#000'
  }
})

const Body = ({ classes }) => (
  <div className={classes.root}>
    <p>hello</p>
  </div>
)


Body.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Body)
