import loadable from '@loadable/component';

/* Compare object equality returns true if different */
export default (value1, value2) => {
  const isEqual = loadable(()=> import('lodash/isEqual'))
  return !isEqual(value1, value2);
};