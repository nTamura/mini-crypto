import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core'
import { Star, StarBorder } from '@material-ui/icons'
import CoinSymbol from 'components/Common/CoinSymbol'
import toCurrency from 'Helpers/toCurrency'

const styles = () => ({
  root: {
    width: '100%',
    overflowX: 'auto',
    marginBottom: 16,
  },
  paper: {
    width: '100%',
    overflowX: 'auto',
  },
  cellOverflow: {
    maxWidth: 80,
  },
  digits: {
    fontFamily: 'monospace',
  },
  up: { color: '#2cac48' },
  down: { color: '#e72121' },
  star: { color: '#f1e325' },
})

const WealthChart = ({
  currency,
  classes,
  chartData,
  filteredChart,
  userInput,
  favoritedItem,
  toggleFavorite,
  rowsToDisplay,
}) => {
  const marketCap = `coin.market_cap_${currency}`
  const price = `coin.price_${currency}`
  let data = chartData
  // let data
  // if (filteredChart.length || userInput.length) {
  //   data = filteredChart
  // } else {
  //   data = chartData
  // }

  return (
    <div className={classes.root}>
      <Paper className={classes.root}>
        {data.length < 1 ? (
          <Table className={classes.table}>
            <TableBody>
              <TableRow>
                <TableCell align="center">
                  <Typography variant="caption">
                    No results in top 100
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        ) : (
          <Table className={classes.table}>
            <TableHead>
              <TableRow hover>
                <TableCell padding="checkbox" />
                <TableCell padding="checkbox" />
                <TableCell padding="checkbox" align="right">
                  Value
                </TableCell>
                <TableCell padding="checkbox" align="right">
                  Market
                </TableCell>
                <TableCell padding="checkbox" align="right">
                  Change (24h)
                </TableCell>
                <TableCell padding="checkbox" align="right">
                  Change (7d)
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.slice(0, rowsToDisplay).map(coin => (
                <TableRow key={coin.id}>
                  <TableCell padding="checkbox">
                    <CoinSymbol symbol={coin.symbol} large />
                  </TableCell>
                  <TableCell
                    padding="none"
                    component="th"
                    scope="row"
                    className={classes.cellOverflow}
                  >
                    <Typography variant="body1" noWrap>
                      {coin.name}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      13.241 {coin.symbol}
                    </Typography>
                  </TableCell>
                  <TableCell padding="checkbox" align="right" noWrap>
                    <Typography className={classes.digits}>
                      {/* {toCurrency(eval(marketCap))} */}$1,131
                    </Typography>
                  </TableCell>
                  <TableCell padding="checkbox" align="right">
                    <Typography className={classes.digits}>
                      {toCurrency(eval(price))}
                    </Typography>
                  </TableCell>
                  <TableCell padding="checkbox" align="right">
                    <Typography
                      className={[
                        classes.digits,
                        coin.percent_change_24h > 0
                          ? `${classes.up}`
                          : `${classes.down}`,
                      ].join(' ')}
                    >
                      {`${coin.percent_change_24h}%`}
                    </Typography>
                  </TableCell>
                  <TableCell padding="checkbox" align="right">
                    <Typography
                      className={[
                        classes.digits,
                        coin.percent_change_7d > 0
                          ? `${classes.up}`
                          : `${classes.down}`,
                      ].join(' ')}
                    >
                      {`${coin.percent_change_7d}%`}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Paper>
    </div>
  )
}
export default withStyles(styles)(WealthChart)
