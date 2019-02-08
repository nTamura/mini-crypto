import React, { Component } from 'react'
import axios from 'axios'
import Overview from 'components/Views/Portfolio/Overview'
import WealthChart from 'components/Views/Portfolio/WealthChart'
import Loading from 'components/Common/Loading'
import Toolbar from 'components/Common/Toolbar'

const url = 'https://api.coinmarketcap.com/v1/ticker/?convert=CAD'

// const url =
//   'https://api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=BTC,ETH,XRP,BCH,EOS,LTC,XLM'
// const url =
//   'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=0&limit=5000&convert=USD'
// const url = 'https://api.coinmarketcap.com/v1/cryptocurrency/info?id=1,2,10'

// const proxyurl = 'https://cors-anywhere.herokuapp.com/'

const API_KEY = process.env.REACT_APP_COIN_API_KEY

const storageWealth = [
  {
    id: 'bitcoin',
    last_updated: '1549580368',
    name: 'Bitcoin',
    symbol: 'BTC',
    quantity: '.83',
  },
  {
    id: 'litecoin',
    last_updated: '1549580368',
    name: 'Litecoin',
    symbol: 'LTC',
    quantity: '5.463',
  },
  {
    id: 'ripple',
    last_updated: '1549580368',
    name: 'XRP',
    symbol: 'XRP',
    quantity: '205.543',
  },
]

class Container extends Component {
  constructor(props) {
    super(props)

    // const storageWealth = JSON.parse(localStorage.getItem('wealth'))
    const storageCurrency = JSON.parse(localStorage.getItem('currency'))

    this.state = {
      isLoading: true,
      chartData: [],
      filteredChart: [],
      rowsToDisplay: 25,
      wealth: storageWealth || [],
      anchorEl: null,
      currency: storageCurrency || 'usd',
    }
  }

  componentDidMount() {
    this.getChart(url)
    this.getWealth()
  }

  getChart = url => {
    axios
      .get(url)
      .then(res => {
        // a.some(v => b.includes(v));

        let filtered = res.data.some(item => {
          return this.state.wealth.symbol.includes(item)
        })

        // let filtered = res.data.filter(coin => {
        //   return coin.symbol.includes(this.state.wealth.symbol)
        // })
        console.log(filtered)

        this.setState({ chartData: res.data }, () => {
          this.setState({ isLoading: false })
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  appendCoins = () => {}

  getWealth = () => {
    // calculate coins to match current price
  }

  handleClick = e => {
    this.setState({ anchorEl: e.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  selectCurrency = e => {
    const currency = e.target.getAttribute('value')
    this.setState({ currency }, () => {
      localStorage.setItem('currency', JSON.stringify(currency))
      this.handleClose()
    })
  }

  render() {
    const {
      isLoading,
      anchorEl,
      currency,
      chartData,
      rowsToDisplay,
      filteredChart,
    } = this.state

    return (
      <>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <Toolbar
              handleClick={e => {
                this.handleClick(e)
              }}
              handleClose={e => {
                this.handleClose(e)
              }}
              selectCurrency={e => {
                this.selectCurrency(e)
              }}
              handleSearch={e => {
                this.handleSearch(e)
              }}
              anchorEl={anchorEl}
              currency={currency}
            />
            <Overview />
            <WealthChart
              chartData={chartData}
              filteredChart={filteredChart}
              // userInput={userInput}
              currency={currency}
              rowsToDisplay={rowsToDisplay}
              favoritedItem={this.favoritedItem}
              toggleFavorite={this.toggleFavorite}
            />
          </>
        )}
      </>
    )
  }
}

export default Container
