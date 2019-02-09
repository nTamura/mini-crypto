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

const ChartBody = ({
  currency,
  classes,
  chartData,
  filteredChart,
  userInput,
  favoritedItem,
  toggleFavorite,
  rowsToDisplay,
}) => {
  const marketCap = `coin.RAW.${currency}.MKTCAP`
  // const marketCap = `coin.market_cap_${currency}`
  const price = `coin.RAW.${currency}.PRICE`
  let data
  if (filteredChart.length || userInput.length) {
    data = filteredChart
  } else {
    data = chartData
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.root}>
        {data.length < 1 ? (
          <Table className={classes.table}>
            <TableBody>
              <TableRow>
                <TableCell align="center">
                  <Typography variant="caption">No results found</Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        ) : (
          <Table className={classes.table}>
            <TableHead>
              <TableRow hover>
                <TableCell padding="checkbox" />
                <TableCell padding="none" align="center">
                  Rank
                </TableCell>
                <TableCell padding="checkbox">Name</TableCell>

                <TableCell padding="checkbox" align="right">
                  Price
                </TableCell>
                <TableCell padding="checkbox" align="right">
                  Change (24h)
                </TableCell>
                <TableCell padding="checkbox" align="right">
                  Change (7d)
                </TableCell>
                <TableCell padding="none" align="right">
                  Market Cap
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.slice(0, rowsToDisplay).map(coin => (
                <TableRow key={coin.CoinInfo.Id}>
                  <TableCell padding="checkbox" align="right">
                    {favoritedItem(coin.CoinInfo.Name) ? (
                      <Star
                        className={classes.star}
                        onClick={() => {
                          toggleFavorite(coin.CoinInfo.Name)
                        }}
                      />
                    ) : (
                      <StarBorder
                        onClick={() => {
                          toggleFavorite(coin.CoinInfo.Name)
                        }}
                      />
                    )}
                  </TableCell>
                  <TableCell padding="none" align="center">
                    {/* {coin.rank} */}
                    <CoinSymbol symbol={coin.CoinInfo.Name} />
                  </TableCell>
                  <TableCell
                    padding="checkbox"
                    component="th"
                    scope="row"
                    className={classes.cellOverflow}
                  >
                    <Typography variant="body1">
                      {/* <CoinSymbol symbol={coin.CoinInfo.Name} /> */}
                      {coin.CoinInfo.Name}
                    </Typography>
                    <Typography variant="caption" noWrap>
                      {coin.CoinInfo.FullName}
                    </Typography>
                  </TableCell>

                  {/*  */}

                  <TableCell padding="checkbox" align="right">
                    <Typography noWrap className={classes.digits}>
                      {toCurrency(eval(price))}
                    </Typography>
                  </TableCell>
                  <TableCell padding="checkbox" align="right">
                    <Typography
                      className={[
                        classes.digits,
                        coin.RAW.USD.CHANGEPCT24HOUR > 0
                          ? `${classes.up}`
                          : `${classes.down}`,
                      ].join(' ')}
                    >
                      {`${coin.RAW.USD.CHANGEPCT24HOUR.toFixed(2)}%`}
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
                  <TableCell padding="none" align="right">
                    <Typography className={classes.digits}>
                      {toCurrency(eval(marketCap))}
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
export default withStyles(styles)(ChartBody)
