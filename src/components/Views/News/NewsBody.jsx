import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Link as LinkIcon, TrendingUp } from '@material-ui/icons'
import toDate from 'Helpers/toDate'
import {
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
} from '@material-ui/core'

const NewsBody = ({ classes, newsData, rowsToDisplay }) => (
  <div className={classes.root}>
    <div className={classes.titleContainer}>
      <TrendingUp className={classes.icon} />
      <Typography variant="h6">Trending Crypto News</Typography>
    </div>

    <div className={classes.cardsList}>
      {newsData.slice(0, rowsToDisplay).map(article => (
        <Card key={article.id} className={classes.card}>
          <CardContent>
            <div className={classes.flex}>
              <Typography variant="caption">
                Source: {article.source.toUpperCase()}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {toDate(article.published_on)}
              </Typography>
            </div>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className={classes.link}
            >
              <img
                src={article.imageurl}
                className={classes.previewImg}
                alt="article preview"
              />
              <Typography variant="h6" className={classes.title} paragraph>
                {article.title}
              </Typography>
            </a>
            <Typography
              dangerouslySetInnerHTML={{
                __html: article.body.split('[&#8230;]', 1)[0].concat('...'),
              }}
            />
          </CardContent>
          <CardActions>
            <Button
              component="a"
              target="_blank"
              rel="noopener noreferrer"
              href={article.url}
            >
              <LinkIcon className={classes.linkIcon} />
              Continue Reading
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  </div>
)

const styles = () => ({
  root: {
    width: '100%',
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: '14px 0',
  },
  title: {
    lineHeight: '1.5rem',
  },
  flex: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  icon: {
    paddingRight: 14,
    color: '#d42f10',
  },
  link: {
    textDecoration: 'none',
  },
  linkIcon: {
    paddingRight: 8,
    color: '#CFEBE7',
  },
  previewImg: {
    width: '100%',
    maxHeight: 160,
    padding: '16px 0',
    objectFit: 'cover',
  },
  cardsList: {
    paddingBottom: 0,
  },
  card: {
    marginBottom: 24,
  },
})

export default withStyles(styles)(NewsBody)
