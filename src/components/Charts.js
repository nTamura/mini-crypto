import React from 'react';
import axios from 'axios';
import { CSSTransitionGroup } from 'react-transition-group'
const url = 'https://api.coinmarketcap.com/v1/ticker/?convert=CAD&limit=25'

// https://api.coinmarketcap.com/v1/ticker/?convert=CAD&limit=10
class Charts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topChart: []
    };
  }

  getChart = (url) => {
    let promise = axios.get(url)
    promise.then((response) => {
      this.setState({
        topChart: response.data
      })
      console.log(this.state.topChart);
    })
  }

  componentDidMount(){
    console.log('updated (5 min intervals)');
    this.getChart(url);

    setInterval( () => {
      this.getChart(url);
    },30000)

    // this.getChart(url);
  }

  render() {
    let topChartList = this.state.topChart.map((coin, i) => {
      let caret = coin.percent_change_1h > 0 ?
        <i className="fa fa-caret-up green" aria-hidden="true"></i> :
        <i className="fa fa-caret-down red" aria-hidden="true"></i> ;
      let sprite = !coin.symbol ? 
      // <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
      <p>error</p>
      :
      <i className={`${coin.symbol} cc`}></i> 
        ;
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
      <div>
        <p className="pull-right text-muted">Charts auto update every 3 minutes</p>
        <h1>Global 25 Charts</h1>
        <hr />
        <div className="container">
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
              {/* <CSSTransitionGroup
                transitionName="example"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}> */}
              {topChartList}
              {/* </CSSTransitionGroup> */}
            </tbody>
          </table>
        </div>
        {/* <div>
          <p className="text-center text-muted">*some icons may not be available</p>
        </div> */}
      </div>
    )
  }
}
export default Charts;
