// @format
import React from 'react';
import {Link as RouterLink} from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Link from '@material-ui/core/Link';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';

import SignInButton from '../components/SignInButton';
import SignOutButton from '../components/SignOutButton';
import {UserConsumer} from './UserContext';

const styles = theme => ({
  appbar: {
    alignSelf: 'flex-start',
  },
  grow: {
    flexGrow: 1,
  },
});

const TopNav = ({classes}) => {
  return (
    <AppBar className={classes.appbar} position="static">
      <Toolbar>
        <Typography color="inherit" variant="title">
          <Link color="inherit" component={RouterLink} to="/">
            Strongbox
          </Link>
        </Typography>
        <div className={classes.grow} />
        <UserConsumer>
          {({isSignedIn, signIn, signOut}) =>
            isSignedIn ? (
              <SignOutButton action={signOut} />
            ) : (
              <SignInButton action={signIn} />
            )
          }
        </UserConsumer>
      </Toolbar>
    </AppBar>
  );
};
export default withStyles(styles)(TopNav);
