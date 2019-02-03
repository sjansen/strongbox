// @format
import {TOGGLE_LOCK} from './types';

export function toggleLock(locked) {
  return {type: TOGGLE_LOCK, locked};
}
