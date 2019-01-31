import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';

import Routes from "./Routes";


const styles = theme => ({
  appbar: {
    alignSelf: 'flex-start',
  },
  container: {
    flexGrow: 1,
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: '100vh',
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
      <Grid container
        className={classes.container}
        direction="column"
        alignItems="center"
        justify="center"
        spacing={0}
      >
        <Routes />
      </Grid>
    </div>
  );
};

export default withStyles(styles)(App);
