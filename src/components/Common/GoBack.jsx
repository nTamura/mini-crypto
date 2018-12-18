import React from 'react'
// import PropTypes from 'prop-types'
import { KeyboardArrowLeft } from '@material-ui/icons'


// if page is not root, go back to previous page
// or go up a path?

const GoBack = ({}) => {
  const handleClick = () => {

  }

  return (
    <div onClick={handleClick}>
      <KeyboardArrowLeft />
    </div>
  )
}

GoBack.propTypes = {
  // : PropTypes.
}

export default GoBack
