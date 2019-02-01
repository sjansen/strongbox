import React from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2,
  },
});

const SignIn = ({classes}) => {
  return (
    <Grid item>
      <Paper className={classes.root}>
        <Typography component="h2" variant="h2">
          authenticating...
        </Typography>
      </Paper>
    </Grid>
  );
};
export default withStyles(styles)(SignIn);
