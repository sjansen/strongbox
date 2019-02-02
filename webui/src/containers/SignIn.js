// @format
import React from 'react';
import {Redirect} from 'react-router';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';

import {UserConsumer} from './UserContext';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2,
  },
});

const SignIn = ({classes}) => {
  return (
    <UserConsumer>
      {({isSignedIn}) =>
        isSignedIn ? (
          <Redirect to="/" />
        ) : (
          <Grid item>
            <Paper className={classes.root}>
              <Typography component="h2" variant="h2">
                authenticating...
              </Typography>
            </Paper>
          </Grid>
        )
      }
    </UserConsumer>
  );
};
export default withStyles(styles)(SignIn);
