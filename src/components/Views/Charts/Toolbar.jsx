import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import { ArrowDropDown, Search } from '@material-ui/icons'
import { IconButton, Menu, MenuItem, InputBase } from '@material-ui/core'

const styles = () => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  currencyDropdown: {
    fontSize: '1rem'
  },
  searchBar: {
    display: 'flex',
    alignItems: 'center'
  },
  searchIcon: {
    color: '#FFF',
    padding: 12,
    fontSize: '1.4rem'
  },
})

const Toolbar = ({
  classes, options, currency, anchorEl, handleClick, handleClose, selectCurrency
}) => (
  <div className={classes.root}>

    <div className={classes.searchBar}>
      <div className={classes.searchIcon}>
        <Search />
      </div>
      <InputBase
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
      />
    </div>

    <IconButton
      aria-label="More"
      aria-owns={anchorEl ? 'long-menu' : null}
      aria-haspopup="true"
      onClick={handleClick}
      className={classes.currencyDropdown}
    >
      {currency.toUpperCase()}
      <ArrowDropDown />
    </IconButton>
    <Menu
      id="long-menu"
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      {options.map(option => (
        <MenuItem
          key={option}
          selected={option === currency}
          value={option}
          onClick={selectCurrency}
        >
          {option.toUpperCase()}
        </MenuItem>
      ))}
    </Menu>
  </div>
)

export default withStyles(styles)(Toolbar)
