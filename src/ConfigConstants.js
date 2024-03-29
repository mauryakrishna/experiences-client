/**
 * Route name string constants
*/
export const WRITE_AN_EXPERIENCE_ROUTE = `/editor`;

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
export const SAVE_ERROR = 4;

export const SHORT_INTRO_MAX_CHARACTERS_LIMIT = 200;
export const EXPERIENCE_TITLE_MAX_ALLOWED_CHARACTERS = 160;

/**
 * local storage key name for experience editor language
*/
export const EXPERIENCE_EDITOR_LANG = `experiences.guru.lang`