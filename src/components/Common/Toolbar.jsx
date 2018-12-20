import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { ArrowDropDown, Search } from '@material-ui/icons'
import { Menu, MenuItem, InputBase, Typography } from '@material-ui/core'

const styles = () => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  currencyDropdown: {
    display: 'flex',
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
  classes, options, currency, anchorEl, handleClick, handleSearch, handleClose, selectCurrency
}) => (
  <div className={classes.root}>

    <div className={classes.searchBar}>
      <div className={classes.searchIcon}>
        <Search
          onChange={handleSearch}
        />
      </div>
      <InputBase
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
      />
    </div>

    <Typography
      aria-owns={anchorEl ? 'menu' : undefined}
      aria-haspopup="true"
      onClick={handleClick}
      className={classes.currencyDropdown}
    >
      {currency.toUpperCase()}
      <ArrowDropDown />
    </Typography>
    <Menu
      id="menu"
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
