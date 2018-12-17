import { createMuiTheme } from '@material-ui/core/styles'

const CustomTheme = createMuiTheme({
  typography: {
    useNextVariants: true,
    fontFamily: 'Roboto'
    // fontColor: 'white',
  },

  palette: {
    type: 'dark',
    text: {
      primary: '#FFF'
    }
  },
  overrides: {
  }
})


export default CustomTheme
