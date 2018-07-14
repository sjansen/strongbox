export const TOGGLE_LOCK = 'TOGGLE_LOCK';

export function toggleLock(locked) {
  return {type: TOGGLE_LOCK, locked};
}
