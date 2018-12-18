import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = () => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    margin: '50%'
  },
  progress: {
    margin: 16,
  }
})

const Loading = ({ classes }) => (
  <div className={classes.root}>
    <CircularProgress className={classes.progress} />
    <Typography variant="body1">
      Loading
    </Typography>
  </div>
)

Loading.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Loading)
