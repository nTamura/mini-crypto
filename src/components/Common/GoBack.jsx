import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import { KeyboardArrowLeft } from '@material-ui/icons'
import { IconButton } from '@material-ui/core'

const styles = () => ({
  icon: {
    color: '#FFF'
  }
})


const GoBack = ({ classes, history }) => (
  <IconButton onClick={history.goBack}>
    <KeyboardArrowLeft className={classes.icon} />
  </IconButton>
)

GoBack.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

export default withRouter(withStyles(styles)(GoBack))
