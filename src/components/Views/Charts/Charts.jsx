import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import axios from 'axios'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

import { IconButton, Menu, MenuItem, Typography } from '@material-ui/core'
import { AttachMoney, Star, StarBorder } from '@material-ui/icons'

import Loading from 'components/Common/Loading'
import 'cryptocoins-icons/webfont/cryptocoins.css'
import 'cryptocoins-icons/webfont/cryptocoins-colors.css'

const url = 'https://api.coinmarketcap.com/v1/ticker/?convert=CAD&limit=25'
const options = ['usd', 'cad']

const styles = () => ({

  tableRoot: {
    width: '100%',
    overflowX: 'scroll'
  },
  cellOverflow: {
    maxWidth: 80,
  },
  icon: {
    paddingRight: 6
  },
  up: {
    color: '#2cac48'
  },
  down: {
    color: '#e72121'
  }
})

class Charts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      topChart: [],
      favorites: ['BTC'],
      anchorEl: null,
      currency: 'usd'
    }
  }

  componentDidMount() {
    this.getChart(url)
    setInterval(() => { this.getChart(url) }, 30000)
  }

  handleClick = e => {
    this.setState({ anchorEl: e.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  selectCurrency = e => {
    this.setState({ currency: e.target.getAttribute('value') }, () => {
      this.handleClose()
    })
  }

  favorited = item => {
    const { favorites } = this.state
    return favorites.includes(item)
  }

  toggleFavorite = item => {
    const { favorites } = this.state
    if (favorites.includes(item)) {
      this.setState({
        favorites: favorites.filter(i => i !== item)
      })
    } else {
      this.setState({
        favorites: favorites.concat(item)
      })
    }
  }

  getChart = url => {
    axios.get(url).then(res => {
      console.log(res.data)
      this.setState({ topChart: res.data }, () => {
        this.setState({ isLoading: false })
      })
    })
  }


  render() {
    const { isLoading, topChart, anchorEl, currency } = this.state
    const { classes } = this.props

    const marketCap = `coin.market_cap_${currency}`
    const price = `coin.price_${currency}`
    const volume = `coin.24h_volume_${currency}`

    return (
      <>
        { isLoading
          ? <Loading />
          : <>
            <div>
              <IconButton
                aria-label="More"
                aria-owns={anchorEl ? 'long-menu' : null}
                aria-haspopup="true"
                onClick={this.handleClick}
              >
                <AttachMoney />
              </IconButton>
              <Menu
                id="long-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleClose}
              >
                {options.map(option => (
                  <MenuItem
                    key={option}
                    selected={option === currency}
                    value={option}
                    onClick={this.selectCurrency}
                  >
                    {option}
                  </MenuItem>
                ))}
              </Menu>
            </div>
            <div>
              <Typography variant="caption">
                Global top 25
              </Typography>
            </div>

            <Paper className={classes.tableRoot}>
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
                    <>

                      <TableRow key={coin.id}>
                        <TableCell padding="checkbox" align="right">
                          {this.favorited(coin.symbol)
                            ? <Star onClick={() => {
                              this.toggleFavorite(coin.symbol)
                            }}
                            />
                            : <StarBorder onClick={() => {
                              this.toggleFavorite(coin.symbol)
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
                    </>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </> }
      </>
    )
  }
}
export default withStyles(styles)(Charts)
