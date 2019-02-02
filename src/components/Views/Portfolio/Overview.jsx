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
})

const Overview = ({ classes }) => {
  return (
    <div className={classes.root}>
      <Typography variant="overline" color="textSecondary">
        Your personal balance
      </Typography>
      <Typography variant="h4">$24,234.56</Typography>
    </div>
  )
}

export default withStyles(styles)(Overview)
