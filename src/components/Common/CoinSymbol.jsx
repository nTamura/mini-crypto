import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import 'cryptocoins-icons/webfont/cryptocoins.css'
import 'cryptocoins-icons/webfont/cryptocoins-colors.css'

const styles = () => ({
  small: {
    fontSize: 25,
  },
  large: {
    fontSize: 28,
  },
  cc: {
    // backgroundImage: 'url(https://image.flaticon.com/icons/svg/8/8235.svg)',
  },
})

const CoinSymbol = ({ classes, symbol, large }) => (
  <i
    className={[symbol, 'cc', `${large ? classes.large : classes.small}`].join(
      ' '
    )}
  />
)

CoinSymbol.propTypes = {
  classes: PropTypes.object.isRequired,
  symbol: PropTypes.string.isRequired,
  large: PropTypes.bool,
}

CoinSymbol.defaultProps = {
  large: false,
}

export default withStyles(styles)(CoinSymbol)
