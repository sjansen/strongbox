import React from 'react';
import {withOAuth} from 'aws-amplify-react';

import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  button: {},
});

const SignInButton = ({classes, OAuthSignIn}) => {
  return (
    <Button
      className={classes.button}
      color="secondary"
      onClick={OAuthSignIn}
      variant="contained"
    >
      Sign In with AWS
    </Button>
  );
};

export default withOAuth(withStyles(styles)(SignInButton));
