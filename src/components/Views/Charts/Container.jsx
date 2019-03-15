import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Toolbar from 'components/Common/Toolbar'
import ChartBody from 'components/Common/ChartBody'
import Loading from 'components/Common/Loading'
import ShowMore from 'components/Common/ShowMore'

const URL = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=100'
// const API_KEY = process.env.REACT_APP_CRYPTO_COMPARE_API_KEY
const API_KEY = process.env.CRYPTOCOMPARE_KEY

const options = { authorization: API_KEY }

function Container() {
  const storageFavorites = JSON.parse(localStorage.getItem('favorites'))
  const storageCurrency = JSON.parse(localStorage.getItem('currency'))

  const [userInput, setUserInput] = useState('')
  const [chartData, setChartData] = useState([])
  const [anchorEl, setAnchorEl] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [filteredChart, setFilteredChart] = useState([])
  const [rowsToDisplay, setRowsToDisplay] = useState(25)
  const [currency, setCurrency] = useState(storageCurrency || 'usd')
  const [favorites, setFavorites] = useState(storageFavorites || [])

  useEffect(() => {
    getChart()
  }, [currency])

  const getChart = async () => {
    setIsLoading(true)
    let result = await axios.get(`${URL}&tsym=${currency}`, options)
    setChartData(result.data.Data)
    setIsLoading(false)
  }

  const handleClick = e => setAnchorEl(e.currentTarget)

  const handleClose = () => setAnchorEl(null)

  const handleSearch = e => {
    const query = e.target.value.toLowerCase()
    const results = Object.values(chartData).filter(
      result =>
        result.CoinInfo.Name.toLowerCase().includes(query) ||
        result.CoinInfo.FullName.toLowerCase().includes(query)
    )
    setFilteredChart(results)
  }

  const showMore = () =>
    setRowsToDisplay(rowsToDisplay => (rowsToDisplay += 25))

  const selectCurrency = async e => {
    setIsLoading(true)
    const value = e.target.getAttribute('value')
    localStorage.setItem('currency', JSON.stringify(value))
    setCurrency(value)
    handleClose()
  }

  const favoritedItem = item => favorites.includes(item)

  const toggleFavorite = item => {
    if (favorites.includes(item)) {
      const value = favorites.filter(i => i !== item)
      setFavorites(value)
      localStorage.setItem('favorites', JSON.stringify([...value]))
    } else {
      const value = favorites.concat(item)
      setFavorites(value)
      localStorage.setItem('favorites', JSON.stringify([...value]))
    }
  }
  return (
    <>
      <Toolbar
        handleClick={e => handleClick(e)}
        handleClose={e => handleClose(e)}
        handleSearch={e => handleSearch(e)}
        selectCurrency={e => selectCurrency(e)}
        anchorEl={anchorEl}
        currency={currency}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <ChartBody
            chartData={chartData}
            userInput={userInput}
            currency={currency}
            filteredChart={filteredChart}
            rowsToDisplay={rowsToDisplay}
            favoritedItem={favoritedItem}
            toggleFavorite={toggleFavorite}
          />
          <ShowMore
            showMore={showMore}
            rowsToDisplay={rowsToDisplay}
            maxRows={chartData.length}
          />
        </>
      )}
    </>
  )
}

export default Container
