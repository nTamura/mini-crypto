import React from 'react'
import ReactDOM from 'react-dom'
import App from 'components/App'
import registerServiceWorker from 'registerServiceWorker'
import { BrowserRouter as Router } from 'react-router-dom'
import { MuiThemeProvider } from '@material-ui/core/styles'
import CustomTheme from 'styles/Theme'
import 'index.css'

ReactDOM.render(
  <MuiThemeProvider theme={CustomTheme}>
    <Router>
      <App />
    </Router>
  </MuiThemeProvider>,
  document.getElementById('root')
)
registerServiceWorker()
