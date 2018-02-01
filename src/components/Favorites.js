import React from 'react';
import InputCrypto from './InputCrypto';
import axios from 'axios';
const url = 'https://api.coinmarketcap.com/v1/ticker/'

// https://api.coinmarketcap.com/v1/ticker/?convert=CAD&limit=10
class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userChart: []
    };
  }

  getChart = (url) => {
    let promise = axios.get(url)
    promise.then((response) => {
      this.setState({
        userChart: response.data
      })
      console.log(this.state.userChart);
    })
  }

  componentDidMount(){
    console.log('updated (3 min intervals)');
    this.getChart(url);

    setInterval( () => {
      this.getChart(url);
    },30000)

    // this.getChart(url);
  }

  searchHandler = (e) => {
      e.preventDefault();
      this.getChart(`${url}` + this.searchInput.value)
  }

  render() {
    let userChartList = this.state.userChart.map((coin, i) => {
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
        <InputCrypto searchHandler={this.searchHandler}/>
        <h1>Favorites</h1>
        <hr />
        <div className="col-sm-offset-2 col-sm-8">
          <table className="table table-striped">
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
              No favorites yet...
              {/* {userChartList} */}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
export default Favorites;
