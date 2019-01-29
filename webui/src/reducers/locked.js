import {TOGGLE_LOCK} from '../actions/types';

const locked = (state = true, action) => {
  switch (action.type) {
    case TOGGLE_LOCK:
      return action.locked;
    default:
      return state;
  }
};

export default locked;
