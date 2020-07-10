const DEFAULT_DEPTH = 1;

// Used to flatten an array, with all sub-arrays concatenated into it recursively.
// Returns a new array.
// CAVEAT: Doesn't cater for scenarios where a child array is in referece to a parent array.
const flat = (array, depth = DEFAULT_DEPTH) =>
  array.reduce((acc, element) => {
    if (Array.isArray(element) && depth > 0) {
      const decrementedDepth = depth - 1;
      const childArray = flat(element, decrementedDepth);
      return [...acc, ...childArray];
    }
    return [...acc, element];
  }, []);

export default flat;
