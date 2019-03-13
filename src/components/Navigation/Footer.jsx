import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import ExtLink from 'components/Common/ExtLink'
import gh from 'assets/GitHub-Mark-Light-32px.png'

const styles = () => ({
  root: {
    padding: 8,
    backgroundColor: '#34353F',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  text: {
    textDecoration: 'none',
    color: 'rgba(255,255,255,0.6)',
  },
  icon: {
    height: 14,
    paddingRight: 6,
  },
})

const Navbar = ({ classes }) => (
  <div className={classes.root}>
    <img src={gh} className={classes.icon} alt="github" />
    <ExtLink
      url="https://github.com/nTamura/mini-crypto"
      variant="caption"
      className={classes.text}
    >
      nTamura
    </ExtLink>
  </div>
)

export default withStyles(styles)(Navbar)
