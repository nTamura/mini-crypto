const toCurrency = num =>
  num.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })

export default toCurrency
