import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import { KeyboardArrowLeft } from '@material-ui/icons'
import { IconButton } from '@material-ui/core'

function GoBack({ classes, history }) {
  return (
    <IconButton onClick={history.goBack}>
      <KeyboardArrowLeft className={classes.icon} />
    </IconButton>
  )
}

const styles = () => ({
  icon: {
    color: '#FFF',
  },
})

GoBack.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

export default withRouter(withStyles(styles)(GoBack))
