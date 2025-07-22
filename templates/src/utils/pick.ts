/* eslint-disable no-param-reassign */
// Disabling no-param-reassign for this file as it's an intentional pattern for Array.prototype.reduce

/**
 * Creates an object composed of the picked object properties.
 *
 * @param {object} object - The source object.
 * @param {string[]} keys - The property keys to pick.
 * @returns {object} The new object.
 */
const pick = <T extends Record<string, unknown>, K extends keyof T>(
  object: T,
  keys: K[],
): Pick<T, K> => {
  return keys.reduce(
    (obj, key) => {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        obj[key] = object[key];
      }
      return obj;
    },
    {} as Pick<T, K>,
  );
};

export default pick;
