import React from 'react';
import {connect} from 'react-redux';

import {getQuote, toggleLock} from '../actions';
import Strongbox from '../components/Strongbox';
import {UserConsumer} from '../contexts/user';

const mapStateToProps = state => ({
  locked: state.locked,
  quote: state.quote,
});

const mapDispatchToProps = dispatch => ({
  toggleLock: locked => {
    dispatch(toggleLock(locked));
    if (!locked) {
      dispatch(getQuote());
    }
  },
});

const StrongboxContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Strongbox);

const Home = () => {
  return (
    <UserConsumer>
      {({isSignedIn}) => <StrongboxContainer showButton={isSignedIn} />}
    </UserConsumer>
  );
};
export default Home;
