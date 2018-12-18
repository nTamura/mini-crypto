import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import axios from 'axios'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

import { IconButton, Menu, MenuItem, Typography, InputBase } from '@material-ui/core'
import { ArrowDropDown, Search, Star, StarBorder } from '@material-ui/icons'

import Loading from 'components/Common/Loading'
import 'cryptocoins-icons/webfont/cryptocoins.css'
import 'cryptocoins-icons/webfont/cryptocoins-colors.css'

const url = 'https://api.coinmarketcap.com/v1/ticker/?convert=CAD&limit=25'
const options = ['usd', 'cad']

const styles = () => ({
  root: {
    width: '100%',
    overflowX: 'scroll'
  },
  tableRoot: {
    width: '100%',
    overflowX: 'scroll'
  },
  cellOverflow: {
    maxWidth: 80,
  },
  toolbar: {
    display: 'flex'
  },
  currencyDropdown: {
    fontSize: '1rem'
  },
  searchBar: {
    display: 'flex',
    alignItems: 'center'
  },
  searchIcon: {

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

class Charts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      topChart: [],
      favorites: [],
      anchorEl: null,
      currency: 'usd'
    }
  }

  componentDidMount() {
    this.getChart(url)
    this.getFavorites('favorites')
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

  favoritedItem = item => {
    const { favorites } = this.state
    return favorites.includes(item)
  }

  toggleFavorite = item => {
    const { favorites } = this.state
    if (favorites.includes(item)) {
      const value = favorites.filter(i => i !== item)
      this.setState({
        favorites: value
      }, () => {
        localStorage.setItem('favorites', JSON.stringify([...value]))
      })
    } else {
      const value = favorites.concat(item)
      this.setState({
        favorites: value
      }, () => {
        localStorage.setItem('favorites', JSON.stringify([...value]))
      })
    }
  }

  getFavorites = key => {
    if (localStorage.hasOwnProperty(key)) {
      try {
        this.setState({ [key]: JSON.parse(localStorage.getItem(key)) })
      } catch (e) {
        console.log(e)
        this.setState({ [key]: localStorage.getItem(key) })
      }
    }
  }

  getChart = api => {
    axios.get(api).then(res => {
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

    return (
      <>
        { isLoading
          ? <Loading />
          : <>
            <div className={classes.toolbar}>

              <div className={classes.searchBar}>
                <div className={classes.searchIcon}>
                  <Search />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                />
              </div>

              <IconButton
                aria-label="More"
                aria-owns={anchorEl ? 'long-menu' : null}
                aria-haspopup="true"
                onClick={this.handleClick}
                className={classes.currencyDropdown}
              >
                {currency.toUpperCase()}
                <ArrowDropDown />
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
                    {option.toUpperCase()}
                  </MenuItem>
                ))}
              </Menu>
            </div>
            <div className={classes.root}>
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
                      <TableRow key={coin.id}>
                        <TableCell padding="checkbox" align="right">
                          {this.favoritedItem(coin.symbol)
                            ? <Star
                              className={classes.star}
                              onClick={() => {
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
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            </div>
          </> }
      </>
    )
  }
}
export default withStyles(styles)(Charts)
