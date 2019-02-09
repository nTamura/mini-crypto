import React, { Component } from 'react'
import axios from 'axios'
import NewsBody from 'components/Views/News/NewsBody'
import Loading from 'components/Common/Loading'
import ShowMore from 'components/Common/ShowMore'

const SOURCE = 'https://min-api.cryptocompare.com/data/v2/news/?lang=EN'

class Container extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      newsData: [],
      rowsToDisplay: 10,
    }
  }

  componentDidMount() {
    this.getNews()
  }

  showMore = () => {
    let { rowsToDisplay: cards } = this.state
    this.setState({
      rowsToDisplay: (cards += 5),
    })
  }

  getNews = () => {
    axios
      .get(SOURCE)
      .catch(error => {
        console.log(error)
      })
      .then(res => {
        this.setState({ newsData: res.data.Data }, () => {
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
