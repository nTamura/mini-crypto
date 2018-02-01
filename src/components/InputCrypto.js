import React from 'react';

class Charts extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('Input');
  }

  render() {
    return (
      <div className=" col-xs-7 pull-right">
        <form>
          <div className="input-group">
            <input type="text"
              className="form-control"
              placeholder="Search"
              re={(self) => {this.searchInput = self}}
            />
            <div className="input-group-btn">
              <button type="submit"
                className="btn btn-default"
                onSubmit={this.searchHandler}>
                <i className="glyphicon glyphicon-plus"></i>
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}
export default Charts;
