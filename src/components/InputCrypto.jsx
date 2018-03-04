import React from 'react'

const Charts = (props) => {
  return (
    <div className=" col-xs-7 pull-right">
      <form onSubmit={(e)=>{props.addFavorite()}}>
        <div className="input-group">
          <input type="text"
            className="form-control"
            placeholder="Search"
          />
          <div className="input-group-btn">
            <button type="submit"
              className="btn btn-default">
            <i className="glyphicon glyphicon-plus"></i>
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Charts;