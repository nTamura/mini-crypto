import React, { Component } from 'react'
import axios from 'axios'
import NewsBody from 'components/Common/NewsBody'
import Loading from 'components/Common/Loading'
import ShowMore from 'components/Common/ShowMore'

const API_KEY = process.env.REACT_APP_NEWS_API_KEY
// const SOURCE = 'https://newsapi.org/v2/top-headlines?sources=crypto-coins-news&apiKey='

class Container extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      newsData: [],
      rowsToDisplay: 5,
    }
  }

  componentDidMount() {
    this.getNews()
    setInterval(() => {
      this.getNews()
    }, 600000)
    // 10 minute fetch intervals
  }

  showMore = () => {
    let { rowsToDisplay: cards } = this.state
    this.setState({
      rowsToDisplay: (cards += 5),
    })
  }

  getNews = () => {
    const query =
      'crypto OR cryptocurrency OR blockchain OR bitcoin OR ethereum OR litecoin OR ripple OR btc OR ltc OR xrp OR eth OR bch OR EOS'
    const date = new Date().toLocaleDateString('en-CA')
    const url = `https://newsapi.org/v2/everything?language=en&q=${query}&from=${date}&sortBy=popularity&apiKey=${API_KEY}`

    axios
      .get(url)
      .catch(error => {
        console.log(error)
      })
      .then(res => {
        // console.log(res.data.articles)
        this.setState({ newsData: res.data.articles }, () => {
          this.setState({ isLoading: false })
        })
      })
  }

  render() {
    const { isLoading, newsData, rowsToDisplay } = this.state
    return (
      <>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <NewsBody newsData={newsData} rowsToDisplay={rowsToDisplay} />
            <ShowMore
              showMore={this.showMore}
              maxRows={newsData.length}
              rowsToDisplay={rowsToDisplay}
            />
          </>
        )}
      </>
    )
  }
}

export default Container
