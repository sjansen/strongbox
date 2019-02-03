// @format
import {Auth} from 'aws-amplify';
import React from 'react';
import {connect} from 'react-redux';

import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';

import {setApiToken} from '../actions';

import Routes from './Routes';
import TopNav from './TopNav';
import {UserProvider} from './UserContext';

const mapStateToProps = state => ({
  apiToken: state.auth.token,
});

const mapDispatchToProps = dispatch => ({
  setApiToken: token => {
    dispatch(setApiToken(token));
  },
});

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

  componentWillUpdate(nextProps, nextState) {
    const {apiToken, authData, setApiToken} = nextProps;
    const newToken =
      authData && authData.signInUserSession
        ? authData.signInUserSession.idToken.jwtToken
        : '';
    if (apiToken !== newToken) {
      setApiToken(newToken);
    }
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(App));
