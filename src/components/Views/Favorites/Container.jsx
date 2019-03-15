import React, { Component } from 'react'
import ChartBody from 'components/Common/ChartBody'
import Toolbar from 'components/Common/Toolbar'
import axios from 'axios'
import Loading from 'components/Common/Loading'

const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=100'
// const API_KEY = process.env.REACT_APP_CRYPTO_COMPARE_API_KEY
const API_KEY = process.env.CRYPTOCOMPARE_KEY

class Container extends Component {
  constructor(props) {
    super(props)

    const storageFavorites = JSON.parse(localStorage.getItem('favorites'))
    const storageCurrency = JSON.parse(localStorage.getItem('currency'))

    this.state = {
      isLoading: true,
      userInput: '',
      chartData: [],
      personalChart: [],
      filteredChart: [],
      favorites: storageFavorites || [],
      anchorEl: null,
      currency: storageCurrency || 'USD',
    }
  }

  componentDidMount() {
    this.getChart(url)
    setInterval(() => {
      this.getChart(url)
    }, 180000)
  }

  getChart = api => {
    const { favorites, currency } = this.state
    axios
      .get(`${api}&tsym=${currency.toUpperCase()}`, {
        authorization: API_KEY,
      })
      .then(res => {
        const favoritesList = res.data.Data.filter(coin =>
          favorites.includes(coin.CoinInfo.Name)
        )
        this.setState({ personalChart: favoritesList }, () => {
          this.setState({ isLoading: false })
        })
      })
  }

  handleClick = e => {
    this.setState({ anchorEl: e.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  handleSearch = e => {
    const { chartData } = this.state
    const keyword = e.target.value.toLowerCase()

    const filteredChart = Object.values(chartData).filter(
      result =>
        result.name.toLowerCase().includes(keyword) ||
        result.symbol.toLowerCase().includes(keyword)
    )
    this.setState({
      filteredChart,
      userInput: keyword,
    })
  }

  selectCurrency = e => {
    const currency = e.target.getAttribute('value')
    this.setState({ currency }, () => {
      localStorage.setItem('currency', JSON.stringify(currency))
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
      this.setState({ favorites: value }, () => {
        localStorage.setItem('favorites', JSON.stringify([...value]))
      })
    } else {
      const value = favorites.concat(item)
      this.setState({ favorites: value }, () => {
        localStorage.setItem('favorites', JSON.stringify([...value]))
      })
    }
  }

  render() {
    const {
      isLoading,
      personalChart,
      anchorEl,
      currency,
      filteredChart,
      userInput,
    } = this.state

    return (
      <div>
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
        {isLoading ? (
          <Loading />
        ) : (
          <ChartBody
            chartData={personalChart}
            filteredChart={filteredChart}
            userInput={userInput}
            currency={currency}
            favoritedItem={this.favoritedItem}
            toggleFavorite={this.toggleFavorite}
          />
        )}
      </div>
    )
  }
}

export default Container
