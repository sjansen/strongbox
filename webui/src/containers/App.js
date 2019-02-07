// @format
import React from 'react';
import {connect} from 'react-redux';

import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';

import {setApiToken} from '../actions';
import config from '../config';

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
    const url =
      'https://' +
      config.cognito.DOMAIN +
      '/oauth2/authorize?client_id=' +
      config.cognito.APP_CLIENT_ID +
      '&redirect_uri=' +
      config.cognito.REDIRECT_SIGN_IN +
      '&response_type=code';
    window.location.assign(url);
  }

  signOut() {
    const url =
      'https://' +
      config.cognito.DOMAIN +
      '/logout?client_id=' +
      config.cognito.APP_CLIENT_ID +
      '&logout_uri=' +
      config.cognito.REDIRECT_SIGN_OUT;
    window.location.assign(url);
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
