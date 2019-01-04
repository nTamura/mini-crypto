import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Typography, Button, Paper } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { Link as LinkIcon, InsertChart, Dashboard, TrendingUp, InsertChartOutlined } from '@material-ui/icons'
import toDate from 'Helpers/toDate'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'

const styles = () => ({
  root: {
    width: '100%',
    // overflowX: 'auto'
  },
  headerTitle: {
    // padding: 12
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: '14px 0'
  },
  icon: {
    paddingRight: 14,
    color: '#d42f10'
  },
  linkIcon: {
    paddingRight: 8,
    color: '#CFEBE7'
  },
  previewImg: {
    width: '100%',
    maxHeight: 160,
    objectFit: 'cover'
  },
  cardsList: {
    paddingBottom: 0
  },
  card: {
    marginBottom: 24
  },
  title: {
    lineHeight: '1.5rem'
  },
  flex: {
    display: 'flex',
    justifyContent: 'space-between'
  }
})

const NewsBody = ({
  currency, classes, newsData, filteredChart, userInput,
  favoritedItem, toggleFavorite, rowsToDisplay
}) => {
  const x = [...Array(6)]
  return (

    <div className={classes.root}>
      <div className={classes.titleContainer}>
        <TrendingUp className={classes.icon} />
        <Typography variant="h6" className={classes.headerTitle}>
          Trending Crypto News
        </Typography>
      </div>
      <div className={classes.cardsList}>

        {newsData.slice(0, rowsToDisplay).map(article => (

          <Card className={classes.card}>
            <CardContent>
              <div className={classes.flex}>
                <Typography variant="caption" gutterBottom>
                  {article.source.name}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {toDate(article.publishedAt)}
                </Typography>
              </div>
              <img
                src={article.urlToImage}
                className={classes.previewImg}
                alt="article preview"
              />
              <Typography variant="h6" className={classes.title} gutterBottom>
                {article.title}
              </Typography>
              <Typography component="p">
                {article.description}
              </Typography>

            </CardContent>
            <CardActions>
              <Button size="medium" component="a" href={article.url}>
                <LinkIcon className={classes.linkIcon} />
                Read more
                {/* open new tab */}
              </Button>
            </CardActions>
          </Card>

        ))}
      </div>
    </div>

  )
}
export default withStyles(styles)(NewsBody)
