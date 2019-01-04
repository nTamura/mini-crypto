import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import 'cryptocoins-icons/webfont/cryptocoins.css'
import 'cryptocoins-icons/webfont/cryptocoins-colors.css'

const styles = () => ({
  icon: {
    paddingRight: 8
  },
})

const CoinSymbol = ({ classes, symbol }) => (
  <i className={[classes.icon, symbol, 'cc'].join(' ')} />
)

CoinSymbol.propTypes = {
  classes: PropTypes.object.isRequired,
  symbol: PropTypes.string.isRequired,
}

export default withStyles(styles)(CoinSymbol)
