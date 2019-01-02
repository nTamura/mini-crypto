import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import { ExpandMore } from '@material-ui/icons'

const styles = () => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 32
  },
  dimmed: {
    color: 'rgba(255,255,255,0.2)'
  },
  icon: {
    color: '#FFF'
  }
})

const ShowMore = ({ classes, showMore, rowsToDisplay }) => (
  <div className={classes.root}>
    { rowsToDisplay <= 99 ? (
      <>
        <Typography component="button" onClick={showMore} variant="button">
          show more
        </Typography>
        <ExpandMore className={classes.icon} />
      </>
    ) : (
      <Typography variant="button" className={classes.dimmed}>
        no more to show
      </Typography>
    )}
  </div>
)

ShowMore.propTypes = {
  classes: PropTypes.object.isRequired,
  showMore: PropTypes.func.isRequired,
  rowsToDisplay: PropTypes.number.isRequired,
}

export default withStyles(styles)(ShowMore)
