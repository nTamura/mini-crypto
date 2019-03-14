import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Overview from 'components/Views/Portfolio/Overview'
import WealthChart from 'components/Views/Portfolio/WealthChart'
import Loading from 'components/Common/Loading'
import Toolbar from 'components/Common/Toolbar'

const API_KEY = process.env.REACT_APP_CRYPTO_COMPARE_API_KEY
const options = { authorization: API_KEY }
const url = 'https://min-api.cryptocompare.com/data/pricemultifull?'

function Container() {
  const storageWallet = JSON.parse(localStorage.getItem('wallet'))
  const storageCurrency = JSON.parse(localStorage.getItem('currency'))

  const [isLoading, setIsLoading] = useState(true)
  const [currency, setCurrency] = useState(storageCurrency || 'usd')
  const [wallet, setWallet] = useState(storageWallet || [])
  const [portfolio, setPortfolio] = useState([])
  const [anchorEl, setAnchorEl] = useState(null)

  useEffect(() => {
    getWealth()
  }, [wallet])

  const getWealth = async () => {
    setIsLoading(true)
    let query = wallet.join(',')
    let result = await axios.get(`${url}&fsyms=${query}&tsyms=usd,cad`, options)
    console.log(`${url}&fsyms=${wallet.join(',')}&tsyms=usd,cad`)

    setPortfolio(result.data)
    // setIsLoading(false)
    console.log(result.data)
  }

  const handleAddCoin = () => {}

  const handleClick = e => setAnchorEl(e.currentTarget)

  const handleClose = () => setAnchorEl(null)

  const selectCurrency = async e => {
    setIsLoading(true)
    const value = e.target.getAttribute('value')
    localStorage.setItem('currency', JSON.stringify(value))
    setCurrency(value)
    handleClose()
  }

  return (
    <>
      <Toolbar
        handleClick={e => handleClick(e)}
        handleClose={e => handleClose(e)}
        selectCurrency={e => selectCurrency(e)}
        handleAddCoin={e => handleAddCoin(e)}
        anchorEl={anchorEl}
        currency={currency}
      />

      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Overview />
          <WealthChart
            // chartData={chartData}
            // filteredChart={filteredChart}
            // userInput={userInput}
            currency={currency}
            // rowsToDisplay={rowsToDisplay}
            // favoritedItem={favoritedItem}
            // toggleFavorite={toggleFavorite}
          />
        </>
      )}
    </>
  )
}

export default Container
