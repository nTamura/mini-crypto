import React from 'react'
import { Card, CardContent, Typography, Divider } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { InfoOutlined } from '@material-ui/icons'
import ExtLink from 'components/Common/ExtLink'

const styles = ({
  root: {
    width: '100%',
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: '14px 0'
  },
  icon: {
    color: '#048dd2',
    paddingRight: 10,
  },
  link: {
    color: '#EE6352',
  }
})

const About = ({ classes }) => (
  <div className={classes.root}>
    <div className={classes.titleContainer}>
      <InfoOutlined className={classes.icon} />
      <Typography variant="h6">
        About
      </Typography>
    </div>

    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h6" className={classes.title} gutterBottom>
          Mini-Crypto
        </Typography>

        <Typography paragraph>
          Created with React and Material-UI.
        </Typography>

        <Typography>
          Cryptocoins Market API
        </Typography>
        <ExtLink url="https://coinmarketcap.com/" paragraph>
          Coinmarketcap
        </ExtLink>

        <Typography>
          Cryptocoins News API
        </Typography>
        <ExtLink url="https://newsapi.org/" paragraph>
          NewsAPI
        </ExtLink>

        <Typography>
          Cryptocoins Icons Repository
        </Typography>
        <ExtLink url="https://github.com/allienworks/cryptocoins" paragraph>
          Cryptocoins Icons
        </ExtLink>

        <Typography>
          Mini-Crypto Repository
        </Typography>
        <ExtLink url="https://github.com/nTamura/mini-crypto" paragraph>
          Source code
        </ExtLink>
      </CardContent>
    </Card>
  </div>
)
export default withStyles(styles)(About)
