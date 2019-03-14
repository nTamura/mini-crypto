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
import maxChar from 'Helpers/maxChar'

const styles = () => ({
  root: {
    width: '100%',
    overflowX: 'auto',
    marginBottom: 16,
    paddingBottom: 16,
  },
  paper: {
    width: '100%',
    overflowX: 'auto',
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
  const price = `coin.RAW.${currency}.PRICE`
  const change = `coin.RAW.${currency}.CHANGEPCT24HOUR`
  const volume = `coin.RAW.${currency}.VOLUME24HOUR`
  const supply = `coin.RAW.${currency}.SUPPLY`

  let data
  if (filteredChart.length || userInput.length) {
    data = filteredChart
  } else {
    data = chartData
  }

  return (
    <div className={classes.root}>
      {chartData && (
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
                    Volume <br />
                    (24h)
                  </TableCell>
                  <TableCell padding="checkbox" align="right">
                    Market Cap
                  </TableCell>
                  <TableCell padding="checkbox" align="right">
                    Supply
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
                      <CoinSymbol symbol={coin.CoinInfo.Name} />
                    </TableCell>
                    <TableCell style={{ padding: '0px 0px 0px 12px' }}>
                      <Typography variant="body1">
                        {coin.CoinInfo.Name}
                      </Typography>
                      <Typography variant="caption" noWrap>
                        {maxChar(coin.CoinInfo.FullName)}
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
                          eval(change) > 0
                            ? `${classes.up}`
                            : `${classes.down}`,
                        ].join(' ')}
                      >
                        {`${eval(change).toFixed(2)}%`}
                      </Typography>
                    </TableCell>
                    <TableCell padding="checkbox" align="right">
                      <Typography className={classes.digits}>
                        {toCurrency(eval(volume))}
                      </Typography>
                    </TableCell>
                    <TableCell padding="checkbox" align="right">
                      <Typography className={classes.digits}>
                        {toCurrency(eval(marketCap))}
                      </Typography>
                    </TableCell>
                    <TableCell padding="checkbox" align="right">
                      <Typography className={classes.digits}>
                        {eval(supply).toLocaleString()}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Paper>
      )}
    </div>
  )
}
export default withStyles(styles)(ChartBody)
