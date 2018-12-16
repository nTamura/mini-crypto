import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group'

// https://api.coinmarketcap.com/v1/ticker/?convert=CAD&limit=10
class Charts extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let topChartList = this.props.topChart.map((coin, i) => {
      let caret = coin.percent_change_1h > 0 ?
        <i className="fa fa-caret-up green" aria-hidden="true"></i> :
        <i className="fa fa-caret-down red" aria-hidden="true"></i> ;
      let sprite = !coin.symbol ?
      // <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
      <p>error</p> :
      <i className={`${coin.symbol} cc`}></i>;
      return (
        <tr key={i}>
          <td>{caret} {coin.percent_change_1h}</td>
          <td>{sprite} </td>
          <td><strong>{coin.symbol}</strong></td>
          <td>{coin.name}</td>
          <td><strong>$ {coin.price_usd}</strong></td>
      </tr>
      )
    })

    return (
      <div className="chartTable">
        <p className="pull-right text-muted">Charts auto update every 3 minutes</p>
        <h1 className="pull-left">Global 25 Charts</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th className="text-center">24H $</th>
              <th>Icon</th>
              <th>Symbol</th>
              <th>Coin</th>
              <th className="pull">Price (USD)</th>
            </tr>
          </thead>
          <tbody>
            {topChartList}
          </tbody>
        </table>
      </div>
    )
  }
}
export default Charts;
