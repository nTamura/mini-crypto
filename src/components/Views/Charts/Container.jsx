import React, { Component } from 'react'
import axios from 'axios'
import Toolbar from 'components/Common/Toolbar'
import ChartBody from 'components/Common/ChartBody'
import Loading from 'components/Common/Loading'

const options = ['usd', 'cad']
const url = 'https://api.coinmarketcap.com/v1/ticker/?convert=CAD&limit=100'

class Container extends Component {
  constructor(props) {
    super(props)

    const storageFavorites = JSON.parse(
      localStorage.getItem('favorites')
    )
    const storageCurrency = JSON.parse(
      localStorage.getItem('currency')
    )

    this.state = {
      isLoading: true,
      userInput: '',
      chartData: [],
      filteredChart: [],
      favorites: storageFavorites || [],
      anchorEl: null,
      currency: storageCurrency || 'usd'
    }
  }

  componentDidMount() {
    this.getChart(url)
    setInterval(() => { this.getChart(url) }, 180000)
    // TODO: add last updated at __
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

    const filteredChart = Object.values(chartData)
      .filter(result => (
        result.name.toLowerCase().includes(keyword)
        || result.symbol.toLowerCase().includes(keyword)
      ))
    this.setState({
      filteredChart,
      userInput: keyword
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

  getChart = api => {
    axios.get(api).then(res => {
      console.log(res.data)
      this.setState({ chartData: res.data }, () => {
        this.setState({ isLoading: false })
      })
    })
  }

  render() {
    const {
      isLoading, chartData, filteredChart, anchorEl, currency, userInput
    } = this.state

    return (
      <div>
        <Toolbar
          handleClick={e => { this.handleClick(e) }}
          handleClose={e => { this.handleClose(e) }}
          selectCurrency={e => { this.selectCurrency(e) }}
          handleSearch={e => { this.handleSearch(e) }}
          anchorEl={anchorEl}
          currency={currency}
          options={options}
        />
        { isLoading
          ? <Loading />
          : <ChartBody
            chartData={chartData}
            filteredChart={filteredChart}
            userInput={userInput}
            currency={currency}
            favoritedItem={this.favoritedItem}
            toggleFavorite={this.toggleFavorite}
          />
        }
      </div>
    )
  }
}

export default Container
