// Used to compare two objects that contain the same keys but potentially different values.
const shallowCompare = (obj1, obj2) => Object.keys(obj1).reduce(
  (acc, key) => acc && obj1[key] === obj2[key], true,
);

export default shallowCompare;
