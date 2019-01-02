import React, { Component } from 'react'
import axios from 'axios'
// import Toolbar from 'components/Common/Toolbar'
import NewsBody from 'components/Common/NewsBody'
import Loading from 'components/Common/Loading'
import ShowMore from 'components/Common/ShowMore'

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
      newsData: [],
      filteredChart: [],
      cardsToDisplay: 10,
      favorites: storageFavorites || [],
      anchorEl: null,
      currency: storageCurrency || 'usd'
    }
  }

  componentDidMount() {
    this.getNews(url)
    setInterval(() => { this.getNews(url) }, 180000)
    // TODO: add last updated at __
  }

  showMore = () => {
    let { cardsToDisplay: rows } = this.state
    this.setState({
      cardsToDisplay: rows += 25
    })
  }

  getNews = api => {
    axios.get(api).then(res => {
      console.log(res.data)
      this.setState({ newsData: res.data }, () => {
        this.setState({ isLoading: false })
      })
    })
  }

  render() {
    const {
      isLoading, newsData, filteredChart, anchorEl, currency,
      userInput, cardsToDisplay, showMore
    } = this.state

    return (
      <div>
        { isLoading
          ? <Loading />
          : <>
            <NewsBody
              newsData={newsData}
              cardsToDisplay={cardsToDisplay}
            />
            <ShowMore
              showMore={this.showMore}
              cardsToDisplay={cardsToDisplay}
            />
          </>
        }
      </div>
    )
  }
}

export default Container
