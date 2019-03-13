import React, { useState, useEffect } from 'react'
import axios from 'axios'
import NewsBody from 'components/Views/News/NewsBody'
import Loading from 'components/Common/Loading'
import ShowMore from 'components/Common/ShowMore'

const SOURCE = 'https://min-api.cryptocompare.com/data/v2/news/?lang=EN'

function Container() {
  const [isLoading, setIsLoading] = useState(true)
  const [newsData, setNewsData] = useState([])
  const [rowsToDisplay, setRowsToDisplay] = useState(10)

  useEffect(() => {
    getNews()
  }, [])

  const showMore = () => {
    setRowsToDisplay(rowsToDisplay => (rowsToDisplay += 5))
  }

  const getNews = () => {
    axios
      .get(SOURCE)
      .catch(error => {
        console.log(error)
      })
      .then(res => {
        setNewsData(res.data.Data)
      })
      .then(res => {
        setIsLoading(false)
      })
  }

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <NewsBody newsData={newsData} rowsToDisplay={rowsToDisplay} />
          <ShowMore
            showMore={showMore}
            maxRows={newsData.length}
            rowsToDisplay={rowsToDisplay}
          />
        </>
      )}
    </>
  )
}

export default Container
