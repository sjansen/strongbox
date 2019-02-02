// @format
import React from 'react';

import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  button: {},
});

const SignOutButton = ({classes, action}) => {
  return (
    <Button
      className={classes.button}
      color="secondary"
      onClick={action}
      variant="contained"
    >
      Sign Out
    </Button>
  );
};

export default withStyles(styles)(SignOutButton);
