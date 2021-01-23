
/* Compare object equality returns true if different */
export default async (value1, value2) => {
  const { default: isEqual } = await import('lodash/isEqual');
  return !isEqual(value1, value2);
};