// @format
import {Auth} from 'aws-amplify';
import React from 'react';

import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';

import {UserProvider} from './UserContext';

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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.signOut = this.signOut.bind(this);
  }

  signOut() {
    Auth.signOut()
      .then(() => {
        // noop
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const {authState, classes} = this.props;
    const isSignedIn = authState === 'signedIn';
    console.log('isSignedIn =>', isSignedIn);
    return (
      <UserProvider value={{isSignedIn, signOut: this.signOut}}>
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
  }
}

export default withStyles(styles)(App);
