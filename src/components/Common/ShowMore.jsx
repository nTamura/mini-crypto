import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Typography, Paper } from '@material-ui/core'
import { KeyboardArrowLeft } from '@material-ui/icons'

const styles = () => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 32
  },
  icon: {
    color: '#FFF'
  }
})


const ShowMore = ({ classes, showMore }) => (
  <div className={classes.root}>
    <Typography component="button" onClick={showMore} variant="button">
      show more
    </Typography>
  </div>
)

ShowMore.propTypes = {
  classes: PropTypes.object.isRequired,
  showMore: PropTypes.func.isRequired,
}

export default withStyles(styles)(ShowMore)
