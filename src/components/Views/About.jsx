import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { InfoOutlined } from '@material-ui/icons'
import ExtLink from 'components/Common/ExtLink'

const About = ({ classes }) => (
  <div className={classes.root}>
    <div className={classes.titleContainer}>
      <InfoOutlined className={classes.icon} />
      <Typography variant="h6">About Mini-Crypto</Typography>
    </div>

    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h6" inline>
          Mini-Crypto
        </Typography>
        <Typography
          color="textSecondary"
          variant="caption"
          className={classes.sub}
          inline
        >
          Alpha-0.0.2
        </Typography>
        <ExtLink href="https://github.com/nTamura/mini-crypto" paragraph>
          Github Repo
        </ExtLink>
        <Typography>Material UI Library</Typography>
        <ExtLink url="https://material-ui.com/" paragraph>
          Material UI
        </ExtLink>
        <Typography>Cryptocompare News/Market API</Typography>
        <ExtLink url="https://cryptocompare.com/" paragraph>
          NewsAPI
        </ExtLink>
        <Typography>Cryptocoins Icons Repository</Typography>
        <ExtLink url="https://github.com/allienworks/cryptocoins" gutterBottom>
          AllienWorks/Cryptocoins Repo
        </ExtLink>
      </CardContent>
    </Card>
  </div>
)

const styles = {
  root: {
    width: '100%',
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: '14px 0',
  },
  sub: {
    verticalAlign: 'middle',
    paddingLeft: 5,
  },
  icon: {
    color: '#048dd2',
    paddingRight: 10,
  },
}

export default withStyles(styles)(About)
