import React from 'react';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';

import imgLocked from '../images/locked.svg';
import imgUnlocked from '../images/unlocked.svg';

const styles = theme => ({
  container: {
    flexGrow: 1,
  },
  card: {
    padding: theme.spacing.unit * 2,
    height: 250,
    width: 200,
  },
  media: {
    height: 200,
  },
  button: {
    margin: theme.spacing.unit,
  },
});

const Strongbox = ({classes, locked, quote, toggleLock}) => {
  return (
    <Grid
      container
      className={classes.container}
      direction="column"
      alignItems="center"
      justify="center"
      spacing={0}
    >
      <Grid item>
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            component="img"
            image={locked ? imgLocked : imgUnlocked}
            title={locked ? 'locked' : 'unlocked'}
          />
          <CardContent>
            <Divider />
            <Typography>
              {locked
                ? 'LOCKED'
                : quote.loading
                ? 'loading...'
                : quote.text || 'This Space For Rent'}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => toggleLock(!locked)}
        >
          {locked ? 'Unlock' : 'Lock'}
        </Button>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(Strongbox);
