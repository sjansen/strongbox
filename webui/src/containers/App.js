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
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  signIn() {
    const {oauth, userPoolWebClientId} = Auth.configure();
    const url =
      'https://' +
      oauth.domain +
      '/oauth2/authorize?redirect_uri=' +
      oauth.redirectSignIn +
      '&response_type=' +
      oauth.responseType +
      '&client_id=' +
      userPoolWebClientId;
    console.log(url, oauth, userPoolWebClientId);
    window.location.assign(url);
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
    return (
      <UserProvider
        value={{isSignedIn, signIn: this.signIn, signOut: this.signOut}}
      >
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
