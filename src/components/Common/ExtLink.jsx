import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const styles = () => ({
  link: {
    textDecoration: 'none',
    color: '#d42f10'
  }
})

const ExtLink = ({ classes, url, children, ...rest }) => (
  <Typography
    component="a"
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className={classes.link}
    {...rest}
    // ^ allows to pass gutterBottom etc to typography
  >
    {children}
  </Typography>
)

ExtLink.propTypes = {
  classes: PropTypes.object.isRequired,
  url: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
}

export default withStyles(styles)(ExtLink)
