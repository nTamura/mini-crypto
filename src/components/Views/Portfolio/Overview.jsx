import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import {
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
} from '@material-ui/core'

const styles = () => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop: 16,
    paddingBottom: 32,
  },
  trackerContainer: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-evenly',
  },
  trackerChild: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
})

const Overview = ({ classes }) => {
  return (
    <div className={classes.root}>
      <Typography variant="overline" color="textSecondary">
        Your personal balance
      </Typography>
      <Typography variant="h4" gutterBottom>
        $24,234.56
      </Typography>
      <div className={classes.trackerContainer}>
        <div className={classes.trackerChild}>
          <Typography variant="caption">Change(1d)</Typography>
          <Typography variant="caption">15.4%</Typography>
        </div>
        <div className={classes.trackerChild}>
          <Typography variant="caption">Change(7d)</Typography>
          <Typography variant="caption">15.4%</Typography>
        </div>
      </div>
    </div>
  )
}

export default withStyles(styles)(Overview)
