import React, { Component } from 'react'
import axios from 'axios'
import Toolbar from 'components/Common/Toolbar'
import ChartBody from 'components/Common/ChartBody'
import Loading from 'components/Common/Loading'
import ShowMore from 'components/Common/ShowMore'

const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10'
// const url = 'https://api.coinmarketcap.com/v1/ticker/?convert=CAD&limit=100'
const API_KEY = process.env.REACT_APP_CRYPTO_COMPARE_API_KEY
class Container extends Component {
  constructor(props) {
    super(props)

    const storageFavorites = JSON.parse(localStorage.getItem('favorites'))
    const storageCurrency = JSON.parse(localStorage.getItem('currency'))

    this.state = {
      isLoading: true,
      userInput: '',
      chartData: [],
      filteredChart: [],
      rowsToDisplay: 25,
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
    // TODO: add last updated at __
  }

  getChart = api => {
    const { currency } = this.state
    axios
      .get(`${api}&tsym=${currency.toUpperCase()}`, {
        authorization: API_KEY,
      })
      .then(res => {
        this.setState({ chartData: res.data.Data }, () => {
          console.log(this.state.chartData[0])
          console.log(this.state.chartData[2])
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

  showMore = () => {
    let { rowsToDisplay: rows } = this.state
    this.setState({
      rowsToDisplay: (rows += 25),
    })
  }

  selectCurrency = e => {
    const currency = e.target.getAttribute('value')
    this.setState({ currency }, () => {
      localStorage.setItem('currency', JSON.stringify(currency).toUpperCase())
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
      chartData,
      filteredChart,
      anchorEl,
      currency,
      userInput,
      rowsToDisplay,
    } = this.state

    return (
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
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <ChartBody
              chartData={chartData}
              filteredChart={filteredChart}
              userInput={userInput}
              currency={currency}
              rowsToDisplay={rowsToDisplay}
              favoritedItem={this.favoritedItem}
              toggleFavorite={this.toggleFavorite}
            />
            <ShowMore
              showMore={this.showMore}
              rowsToDisplay={rowsToDisplay}
              maxRows={chartData.length}
            />
          </>
        )}
      </>
    )
  }
}

export default Container
