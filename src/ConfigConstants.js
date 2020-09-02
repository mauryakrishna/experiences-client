/**
 * time is ms, max wait before making save call for save title and experience.
 */
export const MAX_WAIT = 3000;

/**
 * time is ms, make a debounce call after this time.
 */
export const WAIT = 2000;

/**
 * State states for title and experience
 */
export const SAVE_NOTHING = 1;
export const SAVE_INITIATED = 2;
export const SAVE_COMPLETED = 3;
