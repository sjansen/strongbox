import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';

import StrongboxContainer from '../containers/StrongboxContainer';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: '100vh',
  },
  appbar: {
    alignSelf: 'flex-start',
  },
});

const App = ({classes, locked = true}) => {
  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar} position="static">
        <Toolbar>
          <Typography variant="title" color="inherit" className={classes.flex}>
            Strongbox
          </Typography>
        </Toolbar>
      </AppBar>
      <StrongboxContainer />
    </div>
  );
};

export default withStyles(styles)(App);
