import React from 'react';

import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';

import {UserProvider} from '../contexts/user';

import Routes from './Routes';
import TopNav from './TopNav';

const styles = theme => ({
  grow: {
    flexGrow: 1,
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: '100vh',
  },
});

const App = ({authData, authState, classes, locked = true}) => {
  const isSignedIn = authState === 'signedIn';
  return (
    <UserProvider value={{isSignedIn}}>
      <div className={classes.root}>
        <TopNav />
        <Grid
          container
          className={classes.grow}
          direction="column"
          alignItems="center"
          justify="center"
          spacing={0}
        >
          <Routes />
        </Grid>
      </div>
    </UserProvider>
  );
};

export default withStyles(styles)(App);
