import React, { Component } from 'react'
import { CSSTransitionGroup } from 'react-transition-group'
import { withStyles } from '@material-ui/core/styles'
import axios from 'axios'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

import { IconButton, Menu, MenuItem, CircularProgress } from '@material-ui/core'
import { AttachMoney, HdrWeak } from '@material-ui/icons'

import Loading from 'components/Common/Loading'
import 'cryptocoins-icons/webfont/cryptocoins.css'
import 'cryptocoins-icons/webfont/cryptocoins-colors.css'

// https://api.coinmarketcap.com/v1/ticker/?convert=CAD&limit=10
const url = 'https://api.coinmarketcap.com/v1/ticker/?convert=CAD&limit=25'
const options = ['USD', 'CAD']

const styles = () => ({
})

class Charts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      topChart: [],
      userChart: [],
      anchorEl: null,
      currency: 'USD'
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


    return (
      <>
        { !isLoading
          ? <>
            <Loading />

          </>

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


            <Paper className={classes.root}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow hover>
                    <TableCell>Name</TableCell>
                    <TableCell numeric>Market Cap</TableCell>
                    <TableCell numeric>Price</TableCell>
                    <TableCell numeric>Volume (24h)</TableCell>
                    <TableCell numeric>Change (24h)</TableCell>
                    <TableCell numeric>Graph (7d)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {topChart.map(coin => (
                    <TableRow key={coin.id}>
                      <TableCell component="th" scope="row">
                        <i className={`${coin.symbol} cc`} />
                        {coin.symbol}
                      </TableCell>
                      <TableCell numeric>asd</TableCell>
                      <TableCell numeric>asd</TableCell>
                      <TableCell numeric>asd</TableCell>
                      <TableCell numeric>asd</TableCell>
                    </TableRow>
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
