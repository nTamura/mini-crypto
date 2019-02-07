const toCurrency = num => new Intl.NumberFormat('en-US', {
  style: 'currency', currency: 'USD'
}).format(num)

export default toCurrency
