import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Typography, ButtonBase } from '@material-ui/core'
import { ExpandMore } from '@material-ui/icons'

const styles = () => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
  buttonBase: {
    display: 'block'
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
      <ButtonBase onClick={showMore} className={classes.buttonBase}>
        <Typography component="button" variant="button">
          show more
        </Typography>
        <ExpandMore className={classes.icon} />
      </ButtonBase>
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
