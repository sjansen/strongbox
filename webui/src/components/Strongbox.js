import React from 'react';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {withStyles} from '@material-ui/core/styles';

import imgLocked from '../images/locked.svg';
import imgUnlocked from '../images/unlocked.svg';

const styles = theme => ({
  container: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    height: 200,
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
  },
});

const Strongbox = ({classes, locked, toggleLock}) => {
  const action = locked ? 'Unlock' : 'Lock';
  const image = locked ? (
    <img src={imgLocked} alt="locked" />
  ) : (
    <img src={imgUnlocked} alt="unlocked" />
  );
  const onClick = () => toggleLock(!locked);

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
        <Paper className={classes.paper}>{image}</Paper>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={onClick}
        >
          {action}
        </Button>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(Strongbox);
