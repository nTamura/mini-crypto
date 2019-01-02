import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Typography, Button, Paper } from '@material-ui/core'
import { Star, StarBorder } from '@material-ui/icons'

import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'

const styles = () => ({
  root: {
    width: '100%',
    overflowX: 'auto'
  },
  cardsList: {

  },
})

const NewsBody = ({
  currency, classes, chartData, filteredChart, userInput,
  favoritedItem, toggleFavorite, rowsToDisplay
}) => (
  <div className={classes.root}>
    <div>
      <Typography variant="h6">
        Trending News
      </Typography>
    </div>
    <div className={classes.cardsList}>

      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Word of the Day
          </Typography>
          <Typography variant="h5" component="h2">
            be

            lent
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            adjective
          </Typography>
          <Typography component="p">
            well meaning and kindly.
            <br />
            {'"a benevolent smile"'}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Word of the Day
          </Typography>
          <Typography variant="h5" component="h2">
            be

            lent
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            adjective
          </Typography>
          <Typography component="p">
            well meaning and kindly.
            <br />
            {'"a benevolent smile"'}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>

    </div>
  </div>
)
export default withStyles(styles)(NewsBody)
