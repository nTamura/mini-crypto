import React, { Component } from 'react'
import ChartBody from 'components/Views/Charts/ChartBody'
import Toolbar from 'components/Views/Charts/Toolbar'
import axios from 'axios'

import Loading from 'components/Common/Loading'

const url = 'https://api.coinmarketcap.com/v1/ticker/?convert=CAD&limit=25'

const options = ['usd', 'cad']

class Container extends Component {
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
    const { isLoading, topChart, favorites, anchorEl, currency } = this.state

    return (
      <div>
        <Toolbar
          handleClick={e => { this.handleClick(e) }}
          handleClose={e => { this.handleClose(e) }}
          selectCurrency={e => { this.selectCurrency(e) }}
          anchorEl={anchorEl}
          currency={currency}
          options={options}
        />
        { isLoading
          ? <Loading />
          : <ChartBody
            topChart={topChart}
            currency={currency}
            favoritedItem={item => { this.favoritedItem(item) }}
            toggleFavorite={item => { this.toggleFavorite(item) }}
          />
        }
      </div>

    )
  }
}

export default Container
