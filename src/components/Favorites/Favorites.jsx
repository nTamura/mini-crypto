import React, { Component } from 'react';
import InputCrypto from './InputCrypto';

class Favorites extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let userChartList = this.props.userChart.map((coin, i) => {
      let caret = coin.percent_change_1h > 0 ?
        <i className="fa fa-caret-up green" aria-hidden="true"></i> :
        <i className="fa fa-caret-down red" aria-hidden="true"></i> ;

      return (
        <tr key={i}>
          <td>{caret} {coin.percent_change_1h}</td>
          <td>{coin.symbol}</td>
          <td><strong>{coin.symbol}</strong></td>
          <td>{coin.name}</td>
          <td><strong>$ {coin.price_usd}</strong></td>
      </tr>
      )
    })

    return (
      <div>
        <InputCrypto
          addFavorite={this.props.addFavorite}
        />
        <h1>Favorites</h1>
        <hr />

        <div className="col-sm-offset-2 col-sm-8">
          {/* <table className="table table-striped">
            <thead>
              <tr>
                <th className="text-center">24H $</th>
                <th>Sprite</th>
                <th>Symbol</th>
                <th>Coin</th>
                <th className="pull">Price (USD)</th>
              </tr>
            </thead>
            <tbody>
              {userChartList}
            </tbody>
          </table> */}

          <p className="text-center">Feature unavailable at this time.</p>

        </div>
      </div>
    )
  }
}
export default Favorites;
