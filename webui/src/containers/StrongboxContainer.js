import {connect} from 'react-redux';
import {getQuote, toggleLock} from '../actions';
import Strongbox from '../components/Strongbox';

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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Strongbox);
