import React from 'react'
import ReactDOM from 'react-dom'
import App from 'components/App'
import registerServiceWorker from 'registerServiceWorker'
import createBrowserHistory from 'history/createBrowserHistory'
import { Router } from 'react-router-dom'
import { MuiThemeProvider } from '@material-ui/core/styles'
import CustomTheme from 'styles/Theme'
import 'styles/index.css'

const browserHistory = createBrowserHistory()

ReactDOM.render(
  <MuiThemeProvider theme={CustomTheme}>
    <Router history={browserHistory}>
      <App />
    </Router>
  </MuiThemeProvider>,
  document.getElementById('root')
)
registerServiceWorker()
