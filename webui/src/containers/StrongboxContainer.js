import {connect} from 'react-redux';
import {toggleLock} from '../actions';
import Strongbox from '../components/Strongbox';

const mapStateToProps = state => ({
  locked: state.locked,
});

const mapDispatchToProps = dispatch => ({
  toggleLock: locked => dispatch(toggleLock(locked)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Strongbox);
