import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

import { Typography } from '@material-ui/core'

import { Star, StarBorder } from '@material-ui/icons'

import 'cryptocoins-icons/webfont/cryptocoins.css'
import 'cryptocoins-icons/webfont/cryptocoins-colors.css'


const styles = () => ({
  root: {
    width: '100%',
    overflowX: 'scroll'
  },
  paper: {
    width: '100%',
    overflowX: 'scroll',
  },
  cellOverflow: {
    maxWidth: 80,
  },

  icon: {
    paddingRight: 6
  },
  star: {
    color: '#f1e325'
  },
  up: {
    color: '#2cac48'
  },
  down: {
    color: '#e72121'
  }
})

const ChartBody = ({
  currency, classes, topChart, favoritedItem, toggleFavorite
}) => {
  const marketCap = `coin.market_cap_${currency}`
  const price = `coin.price_${currency}`
  return (


    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow hover>
              <TableCell padding="checkbox" />
              <TableCell padding="checkbox">Name</TableCell>
              <TableCell padding="none" align="right">
                Market Cap
              </TableCell>
              <TableCell padding="checkbox" align="right">
                Price
              </TableCell>
              <TableCell padding="checkbox" align="right">
                Change (24h)
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {topChart.map(coin => (
              <TableRow key={coin.id}>
                <TableCell padding="checkbox" align="right">
                  {favoritedItem(coin.symbol)
                    ? <Star
                      className={classes.star}
                      onClick={() => {
                        toggleFavorite(coin.symbol)
                      }}
                    />
                    : <StarBorder onClick={() => {
                      toggleFavorite(coin.symbol)
                    }}
                    />
                  }
                </TableCell>

                <TableCell padding="checkbox" component="th" scope="row" className={classes.cellOverflow}>
                  <Typography variant="body1">
                    <i className={[classes.icon, `${coin.symbol}`, 'cc'].join(' ')} />
                    {coin.symbol}
                  </Typography>

                  <Typography variant="caption" noWrap>
                    {coin.name}
                  </Typography>

                </TableCell>
                <TableCell padding="none" align="right">
                      $
                  {
                        new Intl.NumberFormat('en-US').format(eval(marketCap))
                      }
                </TableCell>
                <TableCell padding="checkbox" align="right">
                      $
                  {
                        new Intl.NumberFormat('en-US').format(eval(price))
                      }
                </TableCell>
                <TableCell
                  padding="checkbox"
                  align="right"
                  className={coin.percent_change_24h > 0
                    ? `${classes.up}`
                    : `${classes.down}`}
                >
                  {`${coin.percent_change_24h}%`}
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  )
}
export default withStyles(styles)(ChartBody)
