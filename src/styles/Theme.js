import { createMuiTheme } from '@material-ui/core/styles'

const CustomTheme = createMuiTheme({
  typography: {
    useNextVariants: true,
    fontFamily: 'Roboto'
  },
  palette: {
    type: 'dark',
    text: {
      primary: '#FFF'
    }
  },
  overrides: {
    MuiPaper: {
      root: {
        background: 'linear-gradient(to right bottom, #5C5E69, #393D48)'
      }
    }
  }
})


export default CustomTheme
